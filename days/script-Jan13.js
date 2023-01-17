var day = new dayCanvas(document.getElementById("canvas-Jan13"),
    () => {

const canvas = document.getElementById("canvas-Jan13");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


var baseBall = {
    pos: new Vector(width / 2, height / 2),
    Hue: 192,
    Lightness: 45,
    radius: 20,
    id: 0

}

var ballArray = []


// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

var noiseSeed = Math.random()

var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()
        
function noiseGen(x, y, z) {
    curNoiseVal = noise.simplex3(x / 200, y / 200, z / 10000)

    return curNoiseVal 
}

id = 0
function makeBall() {

    possibleX = Math.random() * width
    possibleY = Math.random() * height

    newball = {...baseBall}
    
    newball.pos = new Vector(possibleX, possibleY)
    newball.id = id
    id ++
    randAngle = Math.random() * Math.PI * 2
    newball.vel = new Vector(Math.cos(randAngle), Math.sin(randAngle))
    ballArray.push(newball)
}

for (let index = 0; index < 1000; index++) {
    makeBall()
}  


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

    ballArray.forEach(ball => {

        ball.pos = Vector.add(ball.pos, new Vector(noiseGen(ball.pos.x, ball.pos.y, timeElapsed + ball.id * 30) * 100, noiseGen(ball.pos.x, ball.pos.y, timeElapsed + 1000 + ball.id * 30) * 100))
        

        ctx.beginPath();
        ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
        
        ctx.strokeStyle = `hsl(${ball.Hue}, 100%, ${ball.Lightness}%)`
        ctx.stroke();

        ball.pos = new Vector(((ball.pos.x % width) + width) % width,  ((ball.pos.y % height) + height) % height)


    })
    

    setTimeout(MainLoop, 10)

}
MainLoop()
}   
)

canvasDayList.push(day)

function* pointsInCircle(x, y, r) {
    r++
    x = Math.floor(x)
    y = Math.floor(y)

    for (let xpos = x - r; xpos <= x + r; xpos++) {
        for (let ypos = y - r; ypos <= y + r; ypos++) {
            
            if (((x - xpos) ** 2) + ((y - ypos) ** 2) < r ** 2) {
                
                yield new Vector(xpos, ypos)
            }
        }
    }

}

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

