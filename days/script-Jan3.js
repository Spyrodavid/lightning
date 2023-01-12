var day = new dayCanvas(document.getElementById("canvas-Jan3"),
    () => {

const canvas = document.getElementById("canvas-Jan3");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)


var baseWiggle = {
    X: window.innerWidth / 2,
    Y: 0,
    Hue: 192,
    Lightness: 45,
    angle: Math.PI /3,
    noiseSeed: null
}

var wiggleArray = []

for (let index = 0; index < 1000; index++) {
    newWiggle = {...baseWiggle}
    newWiggle.X = Math.random() * window.innerWidth
    newWiggle.noiseSeed = Math.random()
    newWiggle.Hue = Math.random() * 360
    wiggleArray.push(newWiggle)
}


const wiggleWidth = 100
const wiggleMagnitude = 10
t = 0
function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    wiggleArray.forEach(wiggle => {

        ctx.beginPath();
        movedCenterDist = (wiggleWidth / 2) + Math.sin(t) * wiggleMagnitude

        ctx.moveTo(wiggle.X - Math.cos(wiggle.angle) * -movedCenterDist, wiggle.Y - Math.cos(wiggle.angle) * movedCenterDist);
        ctx.lineTo(wiggle.X + Math.cos(wiggle.angle) * movedCenterDist, wiggle.Y + Math.cos(wiggle.angle) * movedCenterDist);


        wiggle.Y += Math.sin(wiggle.angle) * 3
        wiggle.X += Math.cos(wiggle.angle) * 3
        ctx.strokeStyle = `hsl(${wiggle.Hue}, 100%, ${wiggle.Lightness}%)`
        ctx.stroke()

        let outX = wiggle.X < 0 || wiggle.X > window.innerWidth
        let outY = wiggle.Y < 0 || wiggle.Y > window.innerHeight

        wiggle.angle %= (Math.PI * 2)
        if (outX)  {

            wiggle.angle = Math.PI - wiggle.angle

        }
        if (outY)  {
            wiggle.angle = - (wiggle.angle % (Math.PI * 2))
        }

        noise.seed(wiggle.noiseSeed)
        wiggle.angle += noise.perlin2(t, 0) / 5

    })

    t += .1

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;


    for (let i = 0; i < data.length; i += 4) {

        data[i] = Math.max(Math.floor(data[i] * .99), 0); // red
        data[i + 1] = Math.max(Math.floor(data[i + 1] * .99), 0); // green
        data[i + 2] = Math.max(Math.floor(data[i + 2] * .99), 0); // blue
    }
    ctx.putImageData(imageData, 0, 0);

    setTimeout(MainLoop, 10)

}
MainLoop()
}   
)

canvasDayList.push(day)