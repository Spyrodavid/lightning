var day = new dayCanvas(document.getElementById("canvas-Jan21"),
    (mainLoop) => {
        

const canvas = document.getElementById("canvas-Jan21");
const ctx = canvas.getContext("2d");


width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


var baseBar = {
    X: 0,
    Y: 0,
    angle: Math.PI / 2,
    percent: 0,
    growFactor: .05, // .01
    length: height / 4,
    baseLightness: 100,
    lightness: 100,
    doneGrowing: false
}

function makeNewBar(prevBar, angleChange, lengthMult, lightness) {
    let newBar = {...baseBar}

    newBar.X = prevBar.X + Math.cos(prevBar.angle) * prevBar.length
    newBar.Y = prevBar.Y + Math.sin(prevBar.angle) * prevBar.length

    newBar.length = prevBar.length * lengthMult

    newBar.angle = prevBar.angle + angleChange

    newBar.baseLightness = lightness


    if (lightness == 100 && newBar.length < 7) {
        transformFlag = true
        return
    }

    if (lightness == 100) {
        whiteBar = newBar
    }
    
    barArray.push(newBar)
}

var barArray = [{...baseBar}]

var t1 = Date.now()
var t2 = Date.now()


// Set the fill style and draw a rectangle
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

var wholeTreeHue = 360 * Math.random()

if (Math.random() < .5) {
    Lmult = .75 + Math.random() * .05 
    Rmult = .5 + Math.random() * .25 
} else {
    Lmult = .5 + Math.random() * .25 
    Rmult = .75 + Math.random() * .05 
}

translationPercent = 0

var transformFlag = false

var whiteBar = barArray[0]

var onPageTimeElapsed = 0
// mainloop
function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    t1 = Date.now()

    ctx.fillStyle = "black";
    ctx.fillRect(-width / 2, 0, width, height);


    // sets bottom center to 0,0
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.translate(width / 2, height)

    ctx.rotate(-baseBar.angle * 2)

    


    if (transformFlag) {

        barArray.forEach(bar => {
            bar.doneGrowing = true
        })

        var scaleFact = (baseBar.length / whiteBar.length)
        
        ctx.scale(1 + scaleFact * translationPercent, 1 + scaleFact * translationPercent)
        
        ctx.rotate((Math.PI * .5 - whiteBar.angle ) * translationPercent)

        ctx.translate(-whiteBar.X * translationPercent, -whiteBar.Y * translationPercent)
        
        

        

        translationPercent += .003

        if (translationPercent > 1) {
            translationPercent = 0

            transformFlag = false

            wholeTreeHue = 360 * Math.random()

            if (Math.random() < .5) {
                Lmult = .75 + Math.random() * .05 
                Rmult = .5 + Math.random() * .25 
            } else {
                Lmult = .5 + Math.random() * .25 
                Rmult = .75 + Math.random() * .05 
            }

            newBar = {...baseBar}

            newBar.percent = 1

            barArray = [newBar]
        }

    }

    
    barArray.forEach(bar => {


        bar.lightness = bar.baseLightness

        if (transformFlag && bar.lightness != 100) {
            bar.lightness = bar.baseLightness * (1 - translationPercent)
        }

        ctx.beginPath();

        ctx.strokeStyle = `hsl(${wholeTreeHue}, 100%, ${bar.lightness}%)`
        for (let index = 0; index < 2; index++) {

            ctx.setTransform(1, 0, 0, 1, 0, 0);

            ctx.translate(width / 2, height)

            ctx.rotate(-baseBar.angle * 2)

            if (transformFlag) {
        
                var scaleFact = (baseBar.length / whiteBar.length)
                
                ctx.scale(1 + scaleFact * translationPercent ** 4, 1 + scaleFact * translationPercent ** 4)
                
                ctx.rotate((Math.PI * .5 - whiteBar.angle ) * translationPercent ** 2)
        
                ctx.translate(-whiteBar.X * translationPercent, -whiteBar.Y * translationPercent)
                
            }

            
            ctx.moveTo(bar.X , bar.Y);

            nx = bar.X + Math.cos(bar.angle) * bar.length * bar.percent
            ny = bar.Y + Math.sin(bar.angle) * bar.length * bar.percent

            ctx.lineTo(nx, ny)
            

            ctx.setTransform(1, 0, 0, 1, 0, 0);

            ctx.translate(width / 2, height)

            ctx.rotate(-baseBar.angle * 2)
            
        }
        ctx.stroke()

        if (bar.doneGrowing) {
            return
        }
        
        if (! bar.doneGrowing) {
            bar.percent += bar.growFactor
        } 

        if (bar.percent > 1) {
            bar.percent = 1
            bar.doneGrowing = true
        
            if (bar.lightness == 100) {

                if (Math.random() < .5) {
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

            
        }
        
    });

    
    t2 = Date.now()

    var frameTime = t2 - t1
    // console.log(frameTime)
    onPageTimeElapsed += Math.max(frameTime, 20)

    setTimeout(MainLoop, 20 - frameTime)

}
MainLoop()
}
)

canvasDayList.push(day)