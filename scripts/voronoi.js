function drawVoronoi() {
    eraseVoronoi();

    let all = document.querySelectorAll('a,input')
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "attachedCanvasOverlayForDelaunay")
    let bigbox = document.documentElement.getBoundingClientRect();
    let fullHeight = document.documentElement.scrollHeight;
    let fullWidth = document.documentElement.scrollWidth;
    let canvasPixelWidth = fullWidth;
    let canvasPixelHeight = fullHeight;

    canvas.style['position'] = 'absolute';
    canvas.setAttribute('width', canvasPixelWidth + 'px');
    canvas.setAttribute('height', canvasPixelHeight + 'px');
    canvas.style['left'] = '0';
    canvas.style['top'] = '0';
    canvas.style['zIndex'] = '10';
    canvas.style['pointer-events'] = 'none';
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    document.body.appendChild(canvas)

    let ctx = canvas.getContext('2d');
    let canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "red";
    //console.log(canvasWidth, canvasHeight, canvasPixelWidth, canvasPixelHeight)

    function pixelToCanvas(x, y) {
        return {
            x: canvasWidth * (x / canvasPixelWidth),
            y: canvasHeight * (y / canvasPixelHeight)
        };
    }

    let points = [];

    for (let i=0; i<all.length; i++) {
        let node = all[i];

        let rect = node.getBoundingClientRect();
        let centerX = (rect.left + rect.right)/2;
        let centerY = (rect.top + rect.bottom)/2 - bigbox.top;

        let canvaspts = pixelToCanvas(centerX, centerY);

        ctx.fillRect(canvaspts.x - 2, canvaspts.y - 2, 5, 5);
        points.push([canvaspts.x, canvaspts.y])
    }

    let delaunay = d3.Delaunay.from(points);
    /*
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    delaunay.render(ctx);
    ctx.stroke();
    */

    ctx.beginPath();
    ctx.lineWidth = 3;
    let voronoi = delaunay.voronoi([1, 1, canvasWidth, canvasHeight])
    voronoi.render(ctx);
    ctx.stroke();
    window.addEventListener("resize", drawVoronoi)
}

function eraseVoronoi() {
    try{
        document.getElementById("attachedCanvasOverlayForDelaunay").remove();
    }
    catch(TypeError) {
    }
}

