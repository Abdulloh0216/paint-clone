// GLOBAL VARIABLE
const canvas = document.querySelector('canvas')
toolBtns = document.querySelectorAll('.tool')
fillColor = document.querySelector('#fill-color')
sizeSlider = document.querySelector('#size-slider')
colorBtns = document.querySelectorAll('.colors .option')
colorPicker = document.querySelector('#color-picker')
claerCanvasBtn = document.querySelector('.clear-canvas'),
    saveImageBtn = document.querySelector('.save-img')

// VARIABLE width defaults value
let ctx = canvas.getContext("2d"),
    isDrawing = false,
    brushWidth = 5,
    selectedTool = 'brush',
    selectedColor = '#000',
    prevMouseX,
    prevMouseY,
    snapshot

// SET CANVAS BACKGROUND
const setCAnvasBackground = () => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = selectedColor
}

// SET CANVAS WIDTH AND HEIGHT
window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    setCAnvasBackground()
})

// START DRAWING
const startDraw = e => {
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    ctx.strokeStyle = selectedColor
    ctx.fillStyle = selectedColor
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(snapshot);
}

// DRAW RECTANGLE
const drawRectangle = e => {
    // if (!fillColor.checked) {
    //     return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // }
    // ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    fillColor.checked
        ? ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
        : ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

// DRAW CIRCLE
const drawCircle = e => {
    ctx.beginPath();
    const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2)
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
    fillColor.checked ? ctx.fill() : ctx.stroke()
}

// DRAW TRIANGLE
const drawTriangle = e => {
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    fillColor.checked ? ctx.fill() : ctx.stroke()

    // fillColor.checked
    //     ? ctx.fill(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    //     : ctx.stroke(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

// DRAWING
const drawing = e => {
    if (!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)

    switch (selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break;
        case 'rectangle':
            drawRectangle(e)
            break
        case 'circle':
            drawCircle(e)
            break
        case 'triangle':
            drawTriangle(e)
            break
        case 'eraser':
            ctx.strokeStyle = '#FFFFFF'
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
        default:
            break;
    }
}

// TOOLS BTN AND SET VARIABLES SELECTED TOOL 
toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector(".options .active").classList.remove('active')
        btn.classList.add('active')
        selectedTool = btn.id
        console.log(`Selected tool ${selectedTool}`);
    })
})

//CHANGE BRUSH WIDTH
sizeSlider.addEventListener('change', () => (brushWidth = sizeSlider.value))

// SET COLOR TO SHAPES
colorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        document.querySelector('.options .selected').classList.remove('selected')
        btn.classList.add('selected')
        const bgColor = window.getComputedStyle(btn).getPropertyValue('background-color')
        selectedColor = bgColor

    })
})

// SET COLOR FROM COLOR PICKER
colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value
    colorPicker.parentElement.click()
})

// CLEAR CANVAS BUTTON
claerCanvasBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

// SAVE LIKE IMAGE OUR PAINT
saveImageBtn.addEventListener("click", () => {
    const like = document.createElement('a')
    like.download = 'Abdulloh-paint${Data.now()}.jpg'
    like.href = canvas.toDataURL()
    like.click()
})

// STOP DRAWING
const stopDraw = () => {
    isDrawing = false
}



canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)


