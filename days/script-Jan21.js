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
    length: height / 2
}

var barArray = [baseBar]

var t1 = Date.now()
var t2 = Date.now()


// Set the fill style and draw a rectangle
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);


varonPageTimeElapsed = 0
// mainloop
function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    t1 = Date.now()

    barArray.forEach(bar => {
        ctx.beginPath();
        ctx.moveTo(bar.X, bar.Y);

        nx = bar.X + Math.cos(bar.angle) * bar.length * bar.percent
        ny = bar.Y + Math.sin(bar.angle) * bar.length * bar.percent
        ctx.lineTo(nx, ny)
        ctx.strokeStyle = `white`
        ctx.stroke()
        console.log(nx, ny)
        bar.percent = 1

    });

    
    


    var frameTime = t2 - t1
    onPageTimeElapsed += frameTime + 10    

    setTimeout(MainLoop, 10)

}
MainLoop()
}
)

canvasDayList.push(day)