var day = new dayCanvas(document.getElementById("canvas-Jan31"),
    () => {

const canvas = document.getElementById("canvas-Jan31");
const ctx = canvas.getContext("2d");

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

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

var hue = 0
lightness = 0


function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    t1 = Date.now()
    var frameTime = t1 - t2
    t2 = Date.now()

    let timeElapsed = t2 - programStart

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    font = 70
    title = "January"

    hue += 1

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.font = `${font}px Roboto`;
    ctx.fillText(title, width / 2 - (ctx.measureText(title).width / 2), height / 8 + Math.sin(timeElapsed / 100) * 5);      
    
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
        line = text[i]
        ctx.fillText(line, width / 2 - (ctx.measureText(line).width / 2), height / 2 + i * font / 4);
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