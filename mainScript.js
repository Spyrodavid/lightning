canvases = document.getElementsByTagName("canvas")



window.addEventListener("dblclick", function (e) {

    var Canvas = e.target

    while(Canvas.parentElement.nodeName != "BODY") {
        console.log(Canvas)
        Canvas = Canvas.parentElement
    }
    
    nextCanvas = Canvas.nextElementSibling

    console.log(nextCanvas)
    
    if (nextCanvas == null || nextCanvas.classList.contains("secret")) {
        this.window.scrollTo(0, 0)    
    }
    else {
        nextCanvas.scrollIntoView(true)
    }

}, false);

correctCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "enter"]
var konamiCode = []
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    
    konamiCode.push(event.key)
    for (let index = 0; index < konamiCode.length; index++) {
        if (konamiCode[index] != correctCode[index]) {
        konamiCode = []
        }
        if (konamiCode.length == correctCode.length) {
            document.getElementById("canvas-Jan3").scrollIntoView(true)
            konamiCode = []
        }
        console.log(konamiCode)
        
    }
  
    
  }, true);

function checkPaused() {
    canvasDayList.forEach(day => {
        if (checkVisible(day.canvas)) {
            day.canvas.classList.remove("paused")    
        }
        else {
            day.canvas.classList.add("paused")
        }
    })
    setTimeout(checkPaused, 10)
}
checkPaused()

function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }