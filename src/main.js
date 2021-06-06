const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')

const crimes = [
    [0, 6],
    [26, 12],
    [10, 23],
    [2, 11]
]

let b = 7
let f = 0.6
let g = 2
let k = 300

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
    for(let i = 0; i < 60; i++){
        for(let j = 0; j < 60; j++){
            let probability = k * p(i,j)
            ctx.fillStyle = `rgb(${probability},0,0)`
            ctx.fillRect(i, j, 1, 1)
        }
    }
    
    for(const crimeId in crimes){
        const crime = crimes[crimeId]
        ctx.fillStyle = '#5EFA0F'
        ctx.fillRect(crime[0], crime[1], 1 ,1)
    }

    requestAnimationFrame(renderScreen)
}
renderScreen()