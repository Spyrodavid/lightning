var day = new dayCanvas(document.getElementById("canvas-Jan21"),
    (mainLoop) => {
        

const canvas = document.getElementById("canvas-Jan21");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


var baseBar = {
    X: width / 2,
    Y: height,
    angle: -Math.PI / 2,
    percent: 0,
    growFactor: .01,
    length: height / 4,
    lightness: 100
}

function makeNewBar(prevBar, angleChange, lengthMult, lightness) {
    let newBar = {...baseBar}

    newBar.X = prevBar.X + Math.cos(prevBar.angle) * prevBar.length
    newBar.Y = prevBar.Y + Math.sin(prevBar.angle) * prevBar.length

    newBar.length = prevBar.length * lengthMult

    newBar.angle = prevBar.angle + angleChange

    newBar.lightness = lightness
    
    barArray.push(newBar)
}

var barArray = [{...baseBar}]

var t1 = Date.now()
var t2 = Date.now()


// Set the fill style and draw a rectangle
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

var wholeTreeHue = 360 * Math.random()

if (Math.random < .5) {
    Lmult = .7 + Math.random() * .05 
    Rmult = .5 + Math.random() * .25 
} else {
    Lmult = .5 + Math.random() * .25 
    Rmult = .7 + Math.random() * .05 
    
}

totRotation = 0
totTranslation = 0
totScale = 0

var onPageTimeElapsed = 0
// mainloop
function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    t1 = Date.now()

    

    console.log(barArray.length)

    barArray.forEach(bar => {

        
        ctx.beginPath();
        ctx.moveTo(bar.X, bar.Y);

        nx = bar.X + Math.cos(bar.angle) * bar.length * bar.percent
        ny = bar.Y + Math.sin(bar.angle) * bar.length * bar.percent

        ctx.lineTo(nx, ny)
        ctx.strokeStyle = `hsl(${wholeTreeHue}, 100%, ${bar.lightness}%)`

        ctx.stroke()
        
        if (bar.percent < 1) {
            bar.percent += bar.growFactor
        } else if (bar.growFactor != 0) {
            if (bar.lightness == 100) {

                rand = Math.random()
                if (rand < .5) {
                    makeNewBar(bar,  Math.PI / 5, Lmult, bar.lightness)
                    makeNewBar(bar, -Math.PI / 5, Rmult, bar.lightness * .8)
                } else {
                    makeNewBar(bar,  Math.PI / 5, Lmult, bar.lightness * .8)
                    makeNewBar(bar, -Math.PI / 5, Rmult, bar.lightness)
                }
                
            }
            else {
                makeNewBar(bar,  Math.PI / 5, Lmult, bar.lightness * .8)
                makeNewBar(bar, -Math.PI / 5, Rmult, bar.lightness * .8)
            }

            bar.growFactor = 0
        }
        
    });

    barArray = barArray.filter(bar => {
        if (bar.length < 1)
            return false
        else 
            return true
    })


    
    t2 = Date.now()

    var frameTime = t2 - t1
    onPageTimeElapsed += frameTime + 10    

    setTimeout(MainLoop, 10)

}
MainLoop()
}
)

canvasDayList.push(day)