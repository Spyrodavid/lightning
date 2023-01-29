var day = new dayCanvas(document.getElementById("canvas-Jan24"),
    () => {

const canvas = document.getElementById("canvas-Jan24");
const ctx = canvas.getContext("2d");




canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// Set the fill style and color background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)


var baseCircle = {
    X: window.innerWidth / 2,
    Y: window.innerHeight / 2,
    Hue: 192,
    Lightness: 45,
    previousCircle: null,
    radius: window.innerHeight / 2,
    speed: Math.PI / 60,
    angle: 0
}


var circleArray = [{...baseCircle}]

for (let index = 0; index < 10; index++) {
    var newcircle = {...baseCircle}
    prevCircle = circleArray[circleArray.length - 1]
    newcircle.previousCircle = prevCircle
    newcircle.radius = prevCircle.radius - 20
    //newcircle.speed = prevCircle.speed - Math.PI / 100
    newcircle.Hue = prevCircle.Hue 
    circleArray.push(newcircle)
}

function MainLoop() {

    if (canvas.classList.contains("paused")) {
        setTimeout(MainLoop, 10)
        return
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    for (let i = 0; i < circleArray.length; i++) {
        circle = circleArray[i]

        ctx.beginPath();

        if (circle.previousCircle != null) {
            circle.X = circle.previousCircle.X + Math.cos(circle.previousCircle.angle) * (circle.previousCircle.radius - circle.radius)
            circle.Y = circle.previousCircle.Y - Math.sin(circle.previousCircle.angle) * (circle.previousCircle.radius - circle.radius)
        }
        

        ctx.beginPath();
        ctx.arc(circle.X, circle.Y, circle.radius, circle.angle, circle.angle + Math.PI);
        ctx.strokeStyle = `hsl(${circle.Hue}, 100%, ${circle.Lightness}%)`

        ctx.stroke();

        ctx.beginPath();
        ctx.arc(circle.X, circle.Y, circle.radius, -circle.angle, -circle.angle + Math.PI);
        ctx.strokeStyle = `hsl(${circle.Hue + 100}, 100%, ${circle.Lightness / 2}%)`

        ctx.stroke();
        

        circle.angle %= (Math.PI * 2)
        circle.angle += circle.speed
        circle.Hue += .5
    }
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(Math.floor(data[i] - 3), 0); // red
        data[i + 1] = Math.max(Math.floor(data[i + 1] - 3), 0); // green
        data[i + 2] = Math.max(Math.floor(data[i + 2] - 3), 0); // blue
    }

    ctx.putImageData(imageData, 0, 0);


    setTimeout(MainLoop, 10)

}
MainLoop()
}   
)

canvasDayList.push(day)

function map(value, x1, y1, x2, y2) {return (value - x1) * (y2 - x2) / (y1 - x1) + x2}