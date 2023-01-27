var day = new dayCanvas(document.getElementById("canvas-Jan22"),
    () => {

const canvas = document.getElementById("canvas-Jan22");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


var baseBall = {
    pos: new Vector(width / 2, height / 2),
    vel: new Vector(0, 5),
    accel: new Vector(0, 0),
    Hue: 192,
    Lightness: 45,
    radius: 20,
    charge: 1
}

var ballArray = []


// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

var noiseSeed = Math.random()

var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()


function makeBall() {
    possibleX = Math.random() * width
    possibleY = Math.random() * height

    newball = {...baseBall}
    
    newball.pos = new Vector(possibleX, possibleY)

    randAngle = Math.random() * Math.PI * 2
    newball.vel = new Vector(Math.cos(randAngle), Math.sin(randAngle))

    newball.charge = (Math.random() * 2) - 1 //(Math.random() < .5) ? -1 : 1//
        

    if (newball.charge > 0) {
        newball.Hue = 192
    }

    else {
        newball.Hue = 0
    }

    ballArray.push(newball)
}

for (let index = 0; index < 30; index++) {
    makeBall()
}  



function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }


    t1 = Date.now()
    

    let timeElapsed = t2 - programStart

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    ballArray.forEach(ball => {

        ball.vel = Vector.add(ball.vel, ball.accel)
        ball.pos = Vector.add(ball.pos, ball.vel)

        // friction
        ball.vel = Vector.mul(ball.vel, .99)
        
        ball.Lightness = Math.abs(ball.charge) * 60

        ctx.beginPath();
        ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
        
        ctx.strokeStyle = `hsl(${ball.Hue}, 100%, ${ball.Lightness}%)`
        ctx.fillStyle = `hsl(${ball.Hue}, 100%, ${ball.Lightness}%)`
        ctx.fill()
        ctx.stroke();
        

        if (outsideBound1D(ball.pos.x, width)) {
            ball.vel = new Vector(-ball.vel.x, ball.vel.y)
        }

        if (outsideBound1D(ball.pos.y, height)) {
            ball.vel = new Vector(ball.vel.x, -ball.vel.y)
        }

        ball.accel = new Vector()

        ballArray.forEach(ball2 => {

            if (ball == ball2) {
                return
            }

            K = 3

            directedVector = Vector.sub(ball.pos, ball2.pos)
            distance = Vector.len(directedVector)


            distanceSquared = distance ** 2
            
            totCharge = ball.charge * ball2.charge
            
            accel = Vector.div(Vector.mul(directedVector, totCharge), distanceSquared + .01)
            
            accel = Vector.mul(accel, K)

            ball.accel = Vector.add(ball.accel, accel)  

        })
    })

    t2 = Date.now()

    var frameTime = t2 - t1
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

function outsideBound1D(pos, max) {
    out = (pos < 0 || pos > max)

    return out 
}
