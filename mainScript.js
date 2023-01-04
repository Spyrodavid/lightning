canvases = document.getElementsByTagName("canvas")

window.addEventListener("dblclick", function (e) {
    nextCanvas = e.target.nextElementSibling

    if (nextCanvas == null || nextCanvas.nodeName != "CANVAS") {
        this.window.scrollTo(0, 0)    
    }
    else {
        nextCanvas.scrollIntoView(true)
    }

}, false);

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