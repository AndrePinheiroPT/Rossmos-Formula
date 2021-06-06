const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')


function renderScreen(){
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 29, 29) 

    requestAnimationFrame(renderScreen)
}
renderScreen()