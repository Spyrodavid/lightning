var day = new dayCanvas(document.getElementById("canvas-Jan14"),
    () => {

const canvas = document.getElementById("canvas-Jan14");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;


var baseBall = {
    pos: new Vector(width / 2, height / 2),
    vel: new Vector(0, 5),
    accel: new Vector(0, .2),
    Hue: 192,
    Lightness: 45,
    radius: 20

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
const displaySave = ctx.getImageData(0, 0, width, height)

const noiseSaveData = noiseSave.data
const displaySaveData = displaySave.data
        


function noiseGen(x, y, z) {
    curNoiseVal = noise.simplex3(x / 200, y / 200, z / 10000)

    curVal = ((Math.sqrt(Math.sqrt(curNoiseVal)) + 1)* 1/2) * 255

    return curVal
}


function makeBall() {
    do {
        possibleX = Math.random() * width
        possibleY = Math.random() * height
    } while (noiseSaveData[Dimension2to1(possibleX, possibleY, width) * 4] != 0);

    newball = {...baseBall}
    
    newball.pos = new Vector(possibleX, possibleY)

    randAngle = Math.random() * Math.PI * 2
    newball.vel = new Vector(Math.cos(randAngle), Math.sin(randAngle))
    ballArray.push(newball)
}

for (let index = 0; index < 10; index++) {
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

    //console.log(frameTime)

    ctx.putImageData(displaySave, 0, 0);

    while (ballArray.length < 10) {
        makeBall()
    }

    ballArray.forEach(ball => {

        

        ball.vel = Vector.add(ball.vel, ball.accel)
        ball.pos = Vector.add(ball.pos, ball.vel)
        

        ctx.beginPath();
        //ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);

        // if (Vector.len(ball.vel) != 0) {
        //     ctx.moveTo(ball.pos.x, ball.pos.y)
        //     angleVector = Vector.mul(Vector.normalize(ball.vel), ball.radius)
        //     ctx.lineTo(ball.pos.x + angleVector.x, ball.pos.y + angleVector.y)
        // }
        
        ctx.strokeStyle = `hsl(${ball.Hue}, 100%, ${ball.Lightness}%)`
        ctx.stroke();

        collisionPoints = []

        for (let pos of pointsInCircle(ball.pos.x, ball.pos.y, ball.radius)){
            
            var pos1d = Dimension2to1(pos.x, pos.y, width)

            var curNoise = noiseGen(pos.x, pos.y, timeElapsed)

            displaySaveData[pos1d * 4] = curNoise
            if (true) {

                ball.vel = new Vector(0, 0)
                                
                collisionPoints.push(pos)
                
            }
        }

        ballArray = ballArray.filter ((ball) => {
            if (outsideBounds(ball.pos.x, ball.pos.y, width, height, ball.radius)) {
                return false;
            }
            return true;
        })


        if (collisionPoints.length > 0) {
            ball.Hue += 5
        
            var totVector = new Vector()

            for (let vec of collisionPoints) {
                
                dirtoCenter = Vector.sub(ball.pos, vec)
                totVector = Vector.add(totVector, dirtoCenter)
            }
            
            pushVector = Vector.normalize(totVector)
            
            ball.vel = Vector.mul(pushVector, 10)

        }
        
        
    })

    i = 0
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                
                displaySaveData[i] = displaySaveData[i] - 1; // red
        
                i+= 4
            }
            
        }
    

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

