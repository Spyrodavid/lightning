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
        displaySaveData[i] = 0
    }
    
}

ctx.putImageData(displaySave, 0, 0)

const outline = new Image()
outline.src = `images/ascend/Outline.png`

const red = new Image()
red.src = `images/ascend/Outred.png`

const white = new Image()
white.src = `images/ascend/White.png`

console.log(white.width)

imgOffset = 365

var spawnerArray = []
var baseSpawner = {
    pos: new Vector(width / 2, height / 2),
    imgPosArray: [new Vector(0, -imgOffset), new Vector(0, 0),  new Vector(0, imgOffset)]
}


spawnerArray.push(baseSpawner)

onPageTimeElapsed = 0

function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }


    t1 = Date.now()

    ///////////////

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    spawnerArray.forEach(spawner => {
        spawner.imgPosArray = spawner.imgPosArray.map(pos => {
            if (spawner.pos.y + pos.y + 390 < 0) {
                pos = Vector.add(pos, [0, imgOffset * 3])
            }
            console.log(pos)
            return Vector.add(pos, [0, -1])
            
        })
    })

    

    spawnerArray.forEach(spawner => {
        spawner.imgPosArray.forEach(pos => {
            pos = Vector.add(pos, [Math.sin(onPageTimeElapsed / 1000) * 10, 0])
            ctx.drawImage(white, spawner.pos.x + pos.x - 60, spawner.pos.y + pos.y)
        })
    })
        

    //

    // const whiteSave = ctx.getImageData(0, 0, width, height)

    // ctx.putImageData(whiteSave, 0, 0)

    //

    spawnerArray.forEach(spawner => {
        spawner.imgPosArray.forEach(pos => {
            pos = Vector.add(pos, [Math.sin(onPageTimeElapsed / 1000) * 10, 0])

            ctx.drawImage(outline, spawner.pos.x + pos.x - 60, spawner.pos.y + pos.y)
            ctx.drawImage(red, spawner.pos.x + pos.x - 60, spawner.pos.y + pos.y)

        })
    })

    
    /////////////

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

function wrapMod(x, mod) {
    return ((x % mod) + mod) % mod
}

function outsideBound1D(pos, max) {
    out = (pos < 0 || pos > max)
    return out 
}