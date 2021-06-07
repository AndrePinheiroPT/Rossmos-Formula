const inputB = document.querySelector('#B-range')
const outputB = document.querySelector('#B-output')

const inputF = document.querySelector('#f-range')
const outputF = document.querySelector('#f-output')

const inputG = document.querySelector('#g-range')
const outputG = document.querySelector('#g-output')

export let b = 5
export let f = 0.6
export let g = 2

inputB.defaultValue = 5
outputB.innerHTML = inputB.value
b = inputB.value
inputB.oninput = function(){
    outputB.innerHTML = this.value
    b = this.value
}

inputF.defaultValue = 1.08
outputF.innerHTML = inputF.value
f = inputF.value
inputF.oninput = function(){
    outputF.innerHTML = this.value
    f = this.value
}

inputG.defaultValue = 3.23
outputG.innerHTML = inputG.value
g = inputG.value
inputG.oninput = function(){
    outputG.innerHTML = this.value
    g = this.value
}