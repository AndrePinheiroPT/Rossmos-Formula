import { b, f, g } from './events.js'
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
        let term1 = phi(i, j, crime) / Math.pow(distance, f)

        let term2 = (1 - phi(i, j, crime)) * Math.pow(b, g-f) / Math.pow(Math.abs(2*b - distance), g)
        p += term1 + term2 
    }
    return p
}

function renderScreen(){
    ctx.fillStyle = '#080586'
    ctx.fillRect(0, 0, 29, 29)

    for(let i = 0; i < 60; i++){
        for(let j = 0; j < 60; j++){
            let probability = k * p(i,j)

            ctx.fillStyle = interpolateInferno(probability)
            ctx.fillRect(i, j, 1, 1)
        }
    }

    for(const crimeId in crimes){
        const crime = crimes[crimeId]
        ctx.fillStyle = '#5EFA0F'
        ctx.fillRect(crime[0], crime[1], 1 ,1)
    }
    ctx.fillStyle = '#5AFAEC'
    ctx.fillRect(residence[0], residence[1], 1, 1)

    requestAnimationFrame(renderScreen)
}
renderScreen()