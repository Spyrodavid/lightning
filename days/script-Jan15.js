var day = new dayCanvas(document.getElementById("canvas-Jan15"),
    () => {

const canvas = document.getElementById("canvas-Jan15");
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

const noiseSave = ctx.getImageData(0, 0, width, height)
const displaySave = ctx.getImageData(0, 0, width, height)

const noiseSaveData = noiseSave.data
const displaySaveData = displaySave.data

let i = 0
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        
        noiseSaveData[i] = noiseGen(x,y, 0); // red

        i+= 4
    }
    
}
        
function noiseGen(x, y, z) {
    curNoiseVal = noise.simplex3(x / 20, y / 20, z / 10000)

    curVal = ((Math.sqrt(Math.sqrt(curNoiseVal)) + 1)* 1/2) * 255

    return curVal
}


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


    ctx.putImageData(displaySave, 0, 0);

    var i = 0
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            t = timeElapsed / 1

            ny = y * Math.sin(x / width * Math.PI)
            
            displaySaveData[i] = noiseGen(x,ny, 0 + t)
            displaySaveData[i + 1] = noiseGen(x,ny, 2000 + t)
            displaySaveData[i + 2] = noiseGen(x,ny, 4000 + t)
            

            //if (noiseSaveData[i] > 0) {
            
                // displaySaveData[i] = ((noise.simplex3(x /200,y / 200, 0 + timeElapsed / 1000) + 1) * 127)
                // displaySaveData[i + 1] = ((noise.simplex3(x /200,y / 200, 1000+ timeElapsed / 1000) + 1)* 127)
                // displaySaveData[i + 2] = ((noise.simplex3(x /200,y / 200, 3000+ timeElapsed / 1000) + 1) * 127)
             //   }

            
            // mul = 100
            
            // displaySaveData[i] += noise.simplex3(x /200,y / 200, 0 + timeElapsed / 1000) * mul
            // displaySaveData[i + 1] += noise.simplex3(x /200,y / 200, 1000+ timeElapsed / 1000) * mul
            // displaySaveData[i + 2] += noise.simplex3(x /200,y / 200, 3000+ timeElapsed / 1000) * mul
            
    
            i+= 4
        }
        if (i > width *  height * 4)
        break;
    }
    

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

