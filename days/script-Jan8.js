var day = new dayCanvas(document.getElementById("canvas-Jan8"),
    () => {

// reccomended listening: loosten the clamp

const canvas = document.getElementById("canvas-Jan8");
const ctx = canvas.getContext("2d");




canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)


var baseBar = {
    X: window.innerWidth / 2,
    Y: window.innerHeight / 2,
    Hue: 192,
    Lightness: 45,
    angle: Math.PI / 2,
    length: window.innerHeight / 2,
    speed: Math.PI * .01 * .3 * Math.random() * 2,
    prevBar: null

}

totalLength = 0

var allowGraph = false
canvas.addEventListener("click", () => {allowGraph = !allowGraph; endPoints = []})

var barArray = []

for (let index = 0; index < 50; index++) {
    newbar = {...baseBar}
    newbar.prevBar = barArray[barArray.length - 1]
    newLength = Math.random() * (window.innerHeight / 2) * ((window.innerHeight /2) - totalLength)
    totalLength += newLength
    newbar.length = newLength
    barArray.push(newbar)
    
}

endPoints = []

t = 0
function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    let newarr
    barArray.forEach(bar => {

        ctx.beginPath();

        if (bar.prevBar != null) {
            bar.X = bar.prevBar.X + Math.cos(bar.prevBar.angle) * bar.prevBar.length
            bar.Y = bar.prevBar.Y - Math.sin(bar.prevBar.angle) * bar.prevBar.length
        }
        

        ctx.moveTo(bar.X , bar.Y);
        ctx.lineTo(bar.X + Math.cos(bar.angle) * bar.length, bar.Y - Math.sin(bar.angle) * bar.length);
        
        
        bar.angle += bar.speed
        ctx.strokeStyle = `hsl(${bar.Hue}, 100%, ${bar.Lightness}%)`
        ctx.stroke()

        
        endX = bar.X + Math.cos(bar.angle) * bar.length
        endY = bar.Y - Math.sin(bar.angle) * bar.length
        let outX = endX < 0 || endX > window.innerWidth
        let outY = endY < 0 || endY > window.innerHeight
       
        if (outX || outY) {
            bar.speed *= -1
            bar.length *= .8
            bar.Hue += 2
        }

        bar.angle %= (Math.PI * 2)

        
        //bar.angle += noise.simplex2(bar.X / window.innerWidth, bar.Y / window.innerHeight) / 5
        newarr = [bar.X + Math.cos(bar.angle) * bar.length, bar.Y - Math.sin(bar.angle) * bar.length]
    })

    endPoints = newarr.concat(endPoints)

    t += .1
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(Math.floor(data[i] * .99), 0); // red
        data[i + 1] = Math.max(Math.floor(data[i + 1] * .99), 0); // green
        data[i + 2] = Math.max(Math.floor(data[i + 2] * .99), 0); // blue
    }

    ctx.putImageData(imageData, 0, 0);

    
    if (allowGraph) {
        ctx.beginPath();
        ctx.moveTo(endPoints[0], endPoints[1]);
        
        for (let index = 0; index < endPoints.length; index += 2) {
            ctx.lineTo(endPoints[index], endPoints[index + 1]);
        }
        
        ctx.strokeStyle = "White"
        ctx.stroke()
    }

 
    setTimeout(MainLoop, 10)

}
MainLoop()
}   
)

canvasDayList.push(day)

function map(value, x1, y1, x2, y2) {return (value - x1) * (y2 - x2) / (y1 - x1) + x2}