var day = new dayCanvas(document.getElementById("canvas-Jan30"),
    () => {

const canvas = document.getElementById("canvas-Jan30");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;

// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)


var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

var noiseSeed = Math.random()

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

var hue = 0
lightness = 0

ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

font = 70


onPageTimeElapsed = 0

function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    t1 = Date.now()
    

    let timeElapsed = t2 - programStart

    noise.seed(noiseSeed)

    text = ["Welcome! This is January's website.",
    " Heres a bunch of algorithmic art I did in January.",
    " This Website is meant to be viewed on a laptop sized screen.",
    " (Specificially the size of my laptops screen)",
    " But other sizes may work",
    "\n",
    " Double click anywhere on screen to go to the next slide",
    " On some slides single clicking will do something",
    " (There is a secret code that you can enter to go to some extra content)"
    ]

    ctx.fillStyle = `white`
    ctx.font = `${font / 4}px Arial`;
    for (let i = 0; i < text.length; i++) {

        if ( noise.simplex2(i * 100, timeElapsed / 3000) < 0){
            continue
        }
        line = text[i]
        ctx.fillText(line, width / 2 - (ctx.measureText(line).width / 2), height / 2 + i * font / 4);
    }

    title = "January"

    hue += 1

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.font = `${font}px Roboto`;
    ctx.fillText(title, width / 2 - (ctx.measureText(title).width / 2), height / 8 + Math.sin(timeElapsed / 100) * 5);      

    const getSave = ctx.getImageData(0, 0, width, height)
    var getSaveData = getSave.data

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            if (Math.random() < 0 + 2000 / onPageTimeElapsed) {
                continue
            }

                
                
            i = Dimension2to1(x, y, width) * 4


            surrounding = [Dimension2to1(x - 1, y, width) * 4, Dimension2to1(x + 1, y, width) * 4]
            surrounding.forEach(pixel => {
                if (getSaveData[pixel] < 0) {
                    return
                }
                getSaveData[pixel] = getSaveData[i] + (noise.simplex3(x / 1000, y / 1000 + 0, timeElapsed / 1000)) * 3
                getSaveData[pixel + 1] = getSaveData[i + 1] + (noise.simplex3(x / 1000, y / 1000 + 1000, timeElapsed / 1000)) * 3
                getSaveData[pixel + 2] = getSaveData[i + 2] + (noise.simplex3(x / 1000, y / 1000 + 2000, timeElapsed / 1000)) * 3

            });


        }
    }

    ctx.putImageData(getSave, 0, 0)

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
    x = Math.min(x, width - 1)
    y = Math.min(y, height - 1)

    x = Math.max(x, 0)
    y = Math.max(y, 0)
    return  Math.floor(x + y * width)
}

function map(value, x1, y1, x2, y2) {return (value - x1) * (y2 - x2) / (y1 - x1) + x2}

function HSLToRGB (h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
};