var day = new dayCanvas(document.getElementById("canvas-Jan25"),
    () => {

const canvas = document.getElementById("canvas-Jan25");
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

    min = Math.min(width / 100, height / 10)

    
    for (let y = -100; y < height + 100; y += min ) {
        for (let x = -100; x < width + 100; x += min) {

            nx = x + (timeElapsed / 100 % 40)  
            ny = y + (timeElapsed / 100 % 40)

            ctx.fillStyle = "white";
            ctx.font = "40px Arial";
            ctx.fillText(wordList[0], nx, ny);

            ctx.fillStyle = "Red";
            ctx.font = "40px Arial";
            ctx.fillText(wordList[1], nx, ny);

            ctx.fillStyle = "black";
            ctx.font = "40px Arial";
            ctx.fillText(wordList[2], nx, ny);
            
            
        }
    }

    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    if (Math.random() < 1) {
        
        index = Math.floor(Math.random() * wordList.length)

        word = wordList[index]

        charIndex = Math.floor(Math.random() * word.length)

        randomChar = characters[Math.floor(Math.random() * characters.length)]

        newWord = word.slice(0, charIndex) + randomChar + word.slice(charIndex + 1, word.length)

        wordList[index] = newWord
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