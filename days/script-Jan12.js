var day = new dayCanvas(document.getElementById("canvas-Jan12"),
    () => {

const canvas = document.getElementById("canvas-Jan12");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


var baseBall = {
    X: width / 2,
    Y: 0,
    Hue: 192,
    Lightness: 45,
    dx: 0,
    dy: 0,
    radius:5,
}

var ballArray = []


// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

var noiseSeed = Math.random()

var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()

const noiseSave = ctx.getImageData(0, 0, width, height)
const noiseSaveData = noiseSave.data

function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    t1 = Date.now()
    var frameTime = t1 - t2
    t2 = Date.now()

    let timeElapsed = t2 - programStart

    i = 0
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            curVal = 0;

            if (y > height / 2) {
                curVal = 255
            }
            
            data[i] = curVal; // red
            data[i + 1] = curVal; // green
            data[i + 2] = curVal; // blue

            i+= 4
            //console.log(y)
            
        }
        
    }

    ballArray.forEach(ball => {

        ctx.beginPath();
        ctx.moveTo(ball.X - Math.cos(ball.angle) * movedCenterDist, ball.Y + Math.sin(ball.angle) * movedCenterDist);
        ctx.lineTo(ball.X + Math.cos(ball.angle) * movedCenterDist, ball.Y - Math.sin(ball.angle) * movedCenterDist);
        
        
        ball.Y += Math.sin(ball.angle) * 3
        ball.X += Math.cos(ball.angle) * 3
        ctx.strokeStyle = `hsl(${ball.Hue}, 100%, ${ball.Lightness}%)`
        ctx.stroke()

        let outX = ball.X < 0 || ball.X > window.innerWidth
        let outY = ball.Y < 0 || ball.Y > window.innerHeight

        ball.angle %= (Math.PI * 2)
        if (outX)  {
     
            ball.angle = Math.PI - ball.angle
            
        }
        if (outY)  {
            ball.angle = - (ball.angle % (Math.PI * 2))
        }
        
        ball.angle += noise.simplex2(ball.X / window.innerWidth, ball.Y / window.innerHeight) / 5

    })
    
    

    ctx.putImageData(imageData, 0, 0);
    

    setTimeout(MainLoop, 10)

}
MainLoop()
}   
)

canvasDayList.push(day)