
var day = new dayCanvas(document.getElementById("canvas-Jan29"),
() => {

const canvas = document.getElementById("canvas-Jan29");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;

coverLast = false
canvas.addEventListener("click", () => {
    coverLast = !coverLast
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
})

var baseParticle = {
pos: math.matrix([0, 1, 1]),
Hue: 192,
Lightness: 45,
radius: 20,
}

var particleArray = []


// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(- width / 2 , - height / 2, width, height)

var noiseSeed = Math.random()

var programStart = Date.now()

var t1 = Date.now()
var t2 = Date.now()


function makeParticle() {
possibleX = (Math.random() - .5) * .1
possibleY = (Math.random() - .5) * .1
possibleZ = (Math.random() - .5) * .1

var newparticle = {...baseParticle}

newparticle.pos = new math.matrix([possibleX, possibleY, possibleZ])

newparticle.Hue = (possibleX + .2) * 360 * 10

particleArray.push(newparticle)
}

for (let index = 0; index < 1000; index++) {
makeParticle()
}  

ctx.translate(width / 2, height / 2)

angle = 0

function MainLoop() {

if (canvas.classList.contains("paused")) {
    setTimeout(MainLoop, 10)
    return
}


t1 = Date.now()


let timeElapsed = t2 - programStart

if (coverLast) {
	ctx.fillStyle = "white";
	ctx.fillRect(- width / 2 , - height / 2, width, height)
}

particleArray.forEach(particle => {

    angle += .0001
    
    viewMatrix = math.matrix([[Math.cos(angle), -Math.sin(angle), 0],
                             [Math.sin(angle), Math.cos(angle), 0],
                             [0, 0, 0]])
    
    
    projectedXY = math.multiply(viewMatrix, particle.pos)

    ctx.beginPath();
    ctx.moveTo(projectedXY.get([0]) * 10, projectedXY.get([1]) * 10);

    x = particle.pos.get([0])
    y = particle.pos.get([1])
    z = particle.pos.get([2])
    
    o = 10
    p = 28
    b = 3/8

    dx = o*y - o*x
    dy = p*x - x*z - y
    dz = x*y - b*z


    dt = .01
    vel = math.multiply([dx, dy, dz], dt)

    particle.pos = math.add(particle.pos, vel)

    projectedXY = math.multiply(viewMatrix, particle.pos)
    ctx.lineTo(projectedXY.get([0]) * 10, projectedXY.get([1]) * 10);
    ctx.strokeStyle = `hsl(${particle.Hue}, 100%, ${particle.Lightness}%)`
    ctx.stroke()

    

    
    
})

if (coverLast) {
	const displaySave = ctx.getImageData(0, 0, width, height)
	
	i = 0
	while(i < width * height * 4) {
	    displaySave.data[i] = displaySave.data[i] - 1
	    displaySave.data[i + 1] = displaySave.data[i + 1] - 1
	    displaySave.data[i + 2] = displaySave.data[i + 2] - 1; // red
	
	    i += 4
	    
	}
	
	ctx.putImageData(displaySave, 0, 0)
}

t2 = Date.now()

var frameTime = t2 - t1
//console.log(frameTime)
setTimeout(MainLoop, 10 - frameTime)

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
