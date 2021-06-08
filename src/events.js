import { crimes, residence } from './main.js'
const canvas = document.querySelector('.canvas')

const inputB = document.querySelector('#B-range')
const outputB = document.querySelector('#B-output')

const inputF = document.querySelector('#f-range')
const outputF = document.querySelector('#f-output')

const inputG = document.querySelector('#g-range')
const outputG = document.querySelector('#g-output')

export let mousePosition = []
export let b, f, g

inputB.defaultValue = 5
outputB.innerHTML = inputB.value
b = inputB.value
inputB.oninput = function(){
    outputB.innerHTML = this.value
    b = this.value
}

inputF.defaultValue = 0.73
outputF.innerHTML = inputF.value
f = inputF.value
inputF.oninput = function(){
    outputF.innerHTML = this.value
    f = this.value
}

inputG.defaultValue = 3.45
outputG.innerHTML = inputG.value
g = inputG.value
inputG.oninput = function(){
    outputG.innerHTML = this.value
    g = this.value
}

canvas.addEventListener('mousemove', evt => {
    let rect = canvas.getBoundingClientRect()
    let x = Math.floor((evt.clientX - rect.left - 10) * 30 / 350)
    let y = Math.floor((evt.clientY - rect.top - 10 ) * 30 / 350)
    
    mousePosition[0] = x
    mousePosition[1] = y
})

canvas.addEventListener('click', evt => {
    if(document.getElementById('crime').checked == true){
        let crimeFind = null

        for(const crimeId in crimes){
            const crime = crimes[crimeId]
            if(mousePosition[0] == crime[0] && mousePosition[1] == crime[1]){
                crimeFind = crimeId
                break
            }else{
                crimeFind = null
            }
        }
        if(crimeFind != null){
            crimes.splice(crimeFind, 1)
        }else{
            crimes.push([mousePosition[0], mousePosition[1]])
        }
    }else if(document.getElementById('residence').checked == true){
        if(mousePosition[0] == residence[0] && mousePosition[1] == residence[1]){
            residence[0] = -1
            residence[1] = -1
        }else{
            residence[0] = mousePosition[0]
            residence[1] = mousePosition[1]
        }
    }
})