import { b, f, g, opacity, crimesResidenceMap, probabilityMap } from './events.js'
import { interpolateInferno } from "https://cdn.skypack.dev/d3-scale-chromatic@3"

export const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')

export const crimes = [
    [3, 15],
    [17, 3],
    [18, 25],
    [22, 21],
    [27, 19]
]

export const residence = [17, 18]

let k = 5 / crimes.length

function phi(i, j, crime){
    if(Math.abs(i - crime[0]) + Math.abs(j - crime[1]) > b){
        return 1
    }else{
        return 0
    }
}

function p(i, j){
    let p = 0
    for(const crimeId in crimes){
        const crime = crimes[crimeId]
        let distance = Math.abs(i - crime[0]) + Math.abs(j - crime[1])
        let term1 = phi(i, j, crime) / ((Math.pow(distance, f) == 0) ? 0.00001 : Math.pow(distance, f))

        let term2 = (1 - phi(i, j, crime)) * Math.pow(b, g-f) / Math.pow(((Math.abs(2*b - distance) == 0) ? 1 : Math.abs(2*b - distance)), g)
        p += term1 + term2 
    }
    return p
}

function checkCrimeResidenceMap(){
    if(crimesResidenceMap.checked != true){
        document.getElementById('crime').disabled = true
        document.getElementById('residence').disabled = true
    }else{
        document.getElementById('crime').disabled = false
        document.getElementById('residence').disabled = false
    }
}

function showCrimesResidence(){
    for(const crimeId in crimes){
        const crime = crimes[crimeId]
        ctx.fillStyle = '#5EFA0F'
        ctx.fillRect(crime[0], crime[1], 1 ,1)
    }
    ctx.fillStyle = '#5AFAEC'
    ctx.fillRect(residence[0], residence[1], 1, 1)
}

function showProbability(opacity){
    for(let i = 0; i < 43; i++){
        for(let j = 0; j < 43; j++){
            let probability = k * p(i,j)
            ctx.save()
            ctx.globalAlpha = opacity

            ctx.fillStyle = interpolateInferno(probability)
            ctx.fillRect(i, j, 1, 1)

            ctx.restore()
        }
    } 
}

function renderScreen(){
    ctx.clearRect(0, 0, 43, 43)
    checkCrimeResidenceMap()

    if (probabilityMap.checked == true) showProbability(opacity)
    if (crimesResidenceMap.checked == true) showCrimesResidence()
    if (probabilityMap.checked == false && crimesResidenceMap.checked == false){
        canvas.style.width = 0
        canvas.style.height = 0
    }else {
        canvas.style.width = '500px'
        canvas.style.height = '500px'
    }

    requestAnimationFrame(renderScreen)
}
renderScreen()