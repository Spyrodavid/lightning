var day = new dayCanvas(document.getElementById("canvas-Jan16"),
    () => {

const canvas = document.getElementById("canvas-Jan16");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

var noiseSeed = Math.random()
noise.seed(noiseSeed)

var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()

min = Math.max(height, width) / 2
noiseHeight = Math.min(height, min)
noiseWidth = Math.min(width, min)



const noiseSave   = ctx.getImageData(0, 0, noiseWidth, noiseHeight)
const displaySave = ctx.getImageData(0, 0, noiseWidth, noiseHeight)

const noiseSaveData = noiseSave.data
const displaySaveData = displaySave.data

let i = 0
for (let y = 0; y < noiseHeight; y++) {
    for (let x = 0; x < noiseWidth; x++) {
        noiseVal = ((noiseFromPoint(x, y) + 1) / 2) * 255
        
        noiseSaveData[i] = noiseVal
        noiseSaveData[i + 1] = noiseVal
        noiseSaveData[i + 2] = noiseVal

        i+= 4
    }
    
}

function noiseFromPoint(x, y) {
    minAspect = Math.min(noiseHeight, noiseWidth)
    return noise.simplex2((577 / minAspect ) * x / 200, (577 / minAspect) * y / 200)
}


pointsArray = []

onPageTimeElapsed = 0
t = 0

function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }


    t1 = Date.now()
    
    

    let timeElapsed = t2 - programStart
    

    noise.seed(noiseSeed)

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    

    ctx.putImageData(noiseSave, 0, 0, 0, 0, noiseWidth, noiseHeight);
    start2X = width > height ? noiseWidth : 0
    start2Y = width > height ? 0 : noiseHeight

    t += 2 / 500 * Math.PI
    t = t % (Math.PI * 2)
    
    ctx.beginPath();
    var radius = min / 4
    circleX = (noiseWidth / 2)  + (Math.cos(t) * radius)
    circleY = (noiseHeight / 2) + (Math.sin(t) * radius)
    ctx.arc(circleX, circleY, 3, 0, 2 * Math.PI);
    
    ctx.strokeStyle = "black"
    ctx.stroke();

    pointsArray.unshift(noiseFromPoint(circleX, circleY))

    ctx.beginPath();

    for (let x = 0; x < noiseWidth; x++) {

        if (x < 1) {
            ctx.moveTo(start2X + x, min / 16 * -pointsArray[x * 3] + start2Y + (noiseHeight - 1) / 2);
        }
        else {
            ctx.lineTo(start2X + x, min / 16 * -pointsArray[x * 3] + start2Y + (noiseHeight - 1) / 2);
        }
        
        
    }

    while (pointsArray.length > noiseWidth * 3) {
        pointsArray.pop()
    }
    
    ctx.strokeStyle = `white`
    ctx.stroke()


    // ctx.beginPath();
    // circleX = start2X + (t / (Math.PI * 2)) * noiseWidth
    // circleY = start2Y + (noiseHeight / 2)
    // ctx.arc(circleX, circleY, 3, 0, 2 * Math.PI);
    // ctx.strokeStyle = "grey"
    // ctx.stroke();

    t2 = Date.now()

    var frameTime = t2 - t1
    onPageTimeElapsed += frameTime

    //console.log(frameTime)

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

function outsideBounds(x, y, width, height, r=0) {
    outX = (x + r < 0 || x - r > width)
    outY = (y + r < 0 || y - r > height)

    return outX || outY
}

