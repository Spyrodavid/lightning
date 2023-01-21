var day = new dayCanvas(document.getElementById("canvas-Jan18"),
    () => {

// reccomended listening: rigged game - machine girl

const canvas = document.getElementById("canvas-Jan18");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;

// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

var noiseSeed = Math.random()

var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()


const displaySave = ctx.getImageData(0, 0, width, height)

var displaySaveData = displaySave.data

var dataSave = {
    pos: new Vector(1, 1),
    vel: new Vector(4, 3),
    Hue: 192,
    Lightness: 45,
}

i = 0
while(i < width * height * 4) {
        
    displaySaveData[i] = ( 1 - i / (width * height * 4)) * 255; // red

    i += 4// Math.floor(Math.random() * 100)
    
}

ctx.putImageData(displaySave, 1, 1)

function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }


    t1 = Date.now()
    var frameTime = t1 - t2
    t2 = Date.now()

    let timeElapsed = t2 - programStart

    //console.log(frameTime)

    
    // dt = ctx.getImageData(0, 0, height, width)

    // displaySaveData = dt

    // i = 0
    // while(i < width * height * 4) {
        
    //     displaySaveData[i] = 255; // red

    //     i += Math.floor(Math.random() * 100)
        
    // }

    // ctx.putImageData(displaySave, 0, 0)

    noise.seed(noiseSeed)

    dataSave.pos = Vector.add(dataSave.pos,  dataSave.vel)


    ctx.drawImage(canvas, dataSave.vel.x, dataSave.vel.y)

    
    if (outsideBound1D(dataSave.pos.x, width)) {
        dataSave.vel = new Vector(-dataSave.vel.x, dataSave.vel.y)
    }

    if (outsideBound1D(dataSave.pos.y, height)) {
        
        dataSave.vel = new Vector(dataSave.vel.x, -dataSave.vel.y)
    }

    


    setTimeout(MainLoop, 10)

}
MainLoop()
}   
)

canvasDayList.push(day)

function outsideBounds(x, y, width, height, r=0) {
    outX = (x + r < 0 || x - r > width)
    outY = (y + r < 0 || y - r > height)

    return outX || outY
}

function outsideBound1D(pos, max) {
    out = (pos < 0 || pos > max)

    return out 
}