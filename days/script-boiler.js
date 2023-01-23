var day = new dayCanvas(document.getElementById("canvas-Jan20"),
    () => {

const canvas = document.getElementById("canvas-Jan20");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


canvas.addEventListener("click", () => {})


// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

var noiseSeed = Math.random()

var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()


const displaySave = ctx.getImageData(0, 0, width, height)

var displaySaveData = displaySave.data

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

        i = Dimension2to1(x, y, width) * 4
        displaySaveData[i] = 255
    }
    
}

ctx.putImageData(displaySave, 0, 0)

onPageTimeElapsed = 0


function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }


    t1 = Date.now()

    ///////////////

    ctx.drawImage(canvas, x, y)


    ///////////////

    t2 = Date.now()

    var frameTime = t2 - t1
    onPageTimeElapsed += frameTime + 10

    setTimeout(MainLoop, 10)

}
MainLoop()
}   
)

canvasDayList.push(day)

function Dimension2to1(x, y, width) {
    return  Math.floor(x + y * width)
}

function Dimension1to2(i, width) {
    return [Math.floor(x % width), Math.floor(Math.floor(i / width))]
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }