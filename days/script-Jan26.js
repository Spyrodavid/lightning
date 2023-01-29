var day = new dayCanvas(document.getElementById("canvas-Jan26"),
    () => {

const canvas = document.getElementById("canvas-Jan26");
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

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

wordList = ["HE", "LM", "COO"]


function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    t1 = Date.now()
    var frameTime = t1 - t2
    t2 = Date.now()

    let timeElapsed = t2 - programStart

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    
    // nx += noise.simplex2(0, timeElapsed / 100000) * 2
    // ny += noise.simplex2(1000, timeElapsed / 100000) * 2
    
    noise.seed(noiseSeed)

    charSize = 26

    characters = '9876543210123456789'

    
    for (let y = -100; y < height + 100; y += charSize ) {
        for (let x = -100; x < width + 100; x += charSize) {

            noiseVal = noise.simplex3(x / 1000, y / 1000, timeElapsed / 10000)

            if (noiseVal > 0) {
                ctx.fillStyle = `hsl(10, ${Math.abs(noiseVal) * 100}%, ${Math.abs(noiseVal) * 100}%)`
            }
            else {
                ctx.fillStyle = `hsl(190, ${Math.abs(noiseVal) * 100}%, ${Math.abs(noiseVal) * 100}%)`
            }
            
            ctx.font = "30px Arial";

            char = characters[Math.floor(map(noiseVal, -1, 1, 0, characters.length))]
            ctx.fillText(char, x, y);
            
            
        }
    }
    
    

    setTimeout(MainLoop, 1)

}
MainLoop()
}   
)

canvasDayList.push(day)

function Dimension2to1(x, y, width) {
    return  Math.floor(x + y * width)
}

function map(value, x1, y1, x2, y2) {return (value - x1) * (y2 - x2) / (y1 - x1) + x2}