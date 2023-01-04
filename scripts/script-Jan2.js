var day = new dayCanvas(
    () => {
        


const canvas = document.getElementById("canvas-Jan2");
const ctx = canvas.getContext("2d");

var allowColorVariation = false
canvas.addEventListener("click", () => {allowColorVariation = !allowColorVariation})


ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;


var baseBar = {
    X: window.innerWidth / 2,
    Y: window.innerHeight / 2,
    Angle: 0,
    Hue: 192,
    Lightness: 45,
    rotationalSpeed: .01,
}

var barArray2D = []

var distanceBetween = 20
var length = 10
var sideBuffer = 5

for (let I = 0; I < Math.floor((window.innerWidth - sideBuffer) / distanceBetween); I++) {
    barArray2D[I] = []
    for (let J = 0; J < Math.floor((window.innerHeight - sideBuffer) / distanceBetween); J++) {
        newBar = {...baseBar}
        newBar.rotationalSpeed += Math.random() / 50

        XdistFromWall = sideBuffer + (((window.innerWidth - sideBuffer) % distanceBetween))
        newBar.X = XdistFromWall + (distanceBetween * I)
        YdistFromWall = sideBuffer + (((window.innerHeight - sideBuffer) % distanceBetween))
        newBar.Y = YdistFromWall + (distanceBetween * J)
        barArray2D[I][J] = newBar
    }
}


// Set the fill style and draw a rectangle
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

function checkAngleDifference(angle1, angle2) {
    
    angle1 %= Math.PI
    angle2 %= Math.PI

    lowAngle = angle1 < angle2 ? angle1 : angle2
    highAngle = angle1 > angle2 ? angle1 : angle2
    
    differience = Math.min(highAngle - lowAngle, Math.PI + lowAngle - highAngle)
    return (((Math.PI - differience) / Math.PI) - .5) * 2
}


// mainloop
function MainLoop() {

    for (let I = 0; I < barArray2D.length; I++) {
        for (let J = 0; J < barArray2D[I].length; J++) {
        let bar = barArray2D[I][J]


        let closenessFactor = 0
        let neighbors = 0
        Array(-1, 0, 1).forEach(x => {
            Array(-1, 0, 1).forEach(y => {
                if (x == 0 && y == 0) return;
                if (I + x < 0 || J + y < 0) return;
                if (I + x >= barArray2D.length || J + y >= barArray2D[I].length) return;
                closenessFactor += checkAngleDifference(barArray2D[I][J].Angle, barArray2D[I +x][J + y].Angle)
                
                neighbors += 1
            })
        })
        
        closenessFactor /= neighbors

        if (allowColorVariation) {
            bar.Hue = closenessFactor * 360
            bar.Lightness = baseBar.Lightness
        }
        else {
            bar.Lightness = closenessFactor * 50
            bar.Hue = baseBar.Hue
        }

        ctx.beginPath();

        X1 = bar.X + Math.cos(bar.Angle) * length
        Y1 = bar.Y + Math.sin(bar.Angle) * length
        ctx.moveTo(X1, Y1);
        
        X2 = bar.X - Math.cos(bar.Angle) * length
        Y2 = bar.Y - Math.sin(bar.Angle) * length
        ctx.lineTo(X2, Y2)
        ctx.strokeStyle = `hsl(${bar.Hue}, 100%, ${bar.Lightness}%)`
        ctx.stroke()
        
        bar.Angle += bar.rotationalSpeed
        bar.Angle %= Math.PI
        
        }
    }

    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();

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
