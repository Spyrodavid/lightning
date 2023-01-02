const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;


var allowColorVariation = false
document.body.addEventListener("click", () => {allowColorVariation = !allowColorVariation})
allowColorVariation = false

var baseLightning = {
    X: window.innerWidth / 2,
    Y: window.innerHeight / 2,
    Hue: 192,
    Lightness: 45
}

var lightningArray = [baseLightning]

const gradient = ctx.createLinearGradient(window.innerWidth, 0, window.innerWidth, window.innerHeight);

gradient.addColorStop(0, "black");
gradient.addColorStop(1, "lightyellow");

// Set the fill style and draw a rectangle
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

// mainloop
var i = 0
function MainLoop() {

    lightningArray.forEach(lightning => {
        ctx.beginPath();
        ctx.moveTo(lightning.X, lightning.Y);
        lightning.Y -= Math.floor(Math.random() * 11) - 5
        lightning.X += Math.floor(Math.random() * 11) - 5
        ctx.lineTo(lightning.X, lightning.Y)
        ctx.strokeStyle = `hsl(${lightning.Hue}, 100%, ${lightning.Lightness}%)`
        ctx.stroke()

        if (Math.floor(Math.random() * 100) == 0) {
            let newLightning = {...lightning}
            if (allowColorVariation) {
                if (Math.floor(Math.random() * 10) == 0) { 
                    newLightning.Lightness -= 2
                }
                else {
                newLightning.Lightness = 45
                newLightning.Hue += Math.floor(Math.random() * 31) - 15
                }
            }
            lightningArray.push(newLightning)
        }
    })

    maxLiving = 4000
    if (lightningArray.length > maxLiving) {
        lightningArray = lightningArray.slice(maxLiving / 2, maxLiving)
    }
    
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