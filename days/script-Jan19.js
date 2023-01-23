var day = new dayCanvas(document.getElementById("canvas-Jan19"),
    () => {

// reccomended listening: voyager - daft punk

const canvas = document.getElementById("canvas-Jan19");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


var difI = 0
canvas.addEventListener("click", () => {difI = (difI + 1) % 2})


// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

var noiseSeed = Math.random()

var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()


const displaySave = ctx.getImageData(0, 0, width, height)

var displaySaveData = displaySave.data

widthDivisions = 5
perDivision = Math.floor(width / widthDivisions)
for (let index = 0; index < widthDivisions; index++) {
    for (let y = 0; y < height; y++) {
        for (let x = index * perDivision; x < (index + 1) * perDivision; x++) {

            i = Dimension2to1(x, y, width) * 4
            
            x += index * Math.floor(Math.random()* 1.2)
            

            displaySaveData[i] = (x * y) % 2 == 0 ? 255 : 0

        }
        
    }
}

text = ["Hello World", "If I asked for help", "System Error", "Is this working?"]

ctx.putImageData(displaySave, 0, 0)

onPageTimeElapsed = 0


function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }


    t1 = Date.now()

    let timeElapsed = t2 - programStart


    ctx.drawImage(canvas, (Math.random() - .5) * onPageTimeElapsed / 500, (Math.random() - .5) *  onPageTimeElapsed / 500)


    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Hello World", 10, 50);

    if (Math.random() < .01) {
        ctx.fillStyle = "black";
        ctx.fillText(text.random(), Math.random() * width, Math.random() * height);
    }

    if (onPageTimeElapsed / 1000 > 20 && Math.random() < .003) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Hello World", Math.random() * width, Math.random() * height);
    }

    t2 = Date.now()

    var frameTime = t2 - t1
    onPageTimeElapsed += frameTime + 10

    console.log(onPageTimeElapsed / 1000)

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