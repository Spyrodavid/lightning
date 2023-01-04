window.addEventListener("dblclick", function (e) {
    nextCanvas = e.target.nextElementSibling


    console.log(nextCanvas.nodeName)
    if (nextCanvas.nodeName == "CANVAS") {
        nextCanvas.scrollIntoView(true)
    }
    else {
        this.window.scrollTo(0, 0)
    }
}, false);
