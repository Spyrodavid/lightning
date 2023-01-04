window.addEventListener("dblclick", function (e) {
    nextCanvas = e.target.nextElementSibling

    if (nextCanvas == null || nextCanvas.nodeName != "CANVAS") {
        this.window.scrollTo(0, 0)    
    }
    else {
        nextCanvas.scrollIntoView(true)
    }

}, false);
