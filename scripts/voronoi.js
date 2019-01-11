let showVoronoi = true;
let visitedCell, oldLink, oldLinkStyle;
let handleMouseClickVoronoiGlobal, handleMouseMoveVoronoiGlobal;

function drawVoronoi() {
    eraseVoronoi();
    let linkDisplay = document.createElement("div");
    linkDisplay.setAttribute("id", "attachedLinkOverlayForDelaunay")
    linkDisplay.style['position'] = 'fixed';
    linkDisplay.style['top'] = '1em';
    linkDisplay.style['right'] = '10%';
    linkDisplay.style['maxWidth'] = '80%';
    linkDisplay.style['overflowWrap'] = 'break-word';
    linkDisplay.style['font-size'] = '32px';
    linkDisplay.style['zIndex'] = '11';
    linkDisplay.style['background-color'] = 'white';
    document.body.appendChild(linkDisplay)

    let all = document.querySelectorAll('a, input')
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
    let pointsWithNodes = [];

    for (let i=0; i<all.length; i++) {
        let node = all[i];

        let rect = node.getBoundingClientRect();
        let centerX = (rect.left + rect.right)/2;
        let centerY = (rect.top + rect.bottom)/2 - bigbox.top;

        let canvaspts = pixelToCanvas(centerX, centerY);

        ctx.fillRect(canvaspts.x - 2, canvaspts.y - 2, 5, 5);
        points.push([canvaspts.x, canvaspts.y])
        pointsWithNodes.push([canvaspts.x, canvaspts.y, node])
    }

    let delaunay = d3.Delaunay.from(points);
    /*
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    delaunay.render(ctx);
    ctx.stroke();
    */

    let voronoi = delaunay.voronoi([1, 1, canvasWidth, canvasHeight])
    if (showVoronoi) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        voronoi.render(ctx);
        ctx.stroke();
    }

    let voronoiCellToElement = new Map();
    pointsWithNodes.forEach((entry) => {
        let x = entry[0];
        let y = entry[1];
        let node = entry[2];
        let cell = delaunay.find(x, y)
        voronoiCellToElement.set(cell, node)
    });

    function handleMouseMoveVoronoi(event) {
        let transformed = pixelToCanvas(event.layerX, event.layerY);
        let cell = delaunay.find(transformed.x, transformed.y)

        if (visitedCell != cell) {
            if (visitedCell !== undefined) {
                let oldLink = voronoiCellToElement.get(visitedCell);
                oldLink.style['outline'] = oldLinkStyle;

                if (showVoronoi) {
                    ctx.strokeStyle='black';
                    ctx.beginPath();
                    voronoi.renderCell(visitedCell, ctx);
                    ctx.stroke();
                }
            }

            linkDisplay.style['outline'] = '5px solid black';
            let newLink = voronoiCellToElement.get(cell);
            oldLink = newLink;
            oldLinkStyle = newLink.style['outline'] || 'none';
            newLink.style['outline'] = '5px solid black';

            if (newLink.tagName == 'A') {
                linkDisplay.innerHTML = newLink.href;
            }
            else if (newLink.tagName == 'INPUT') {
                linkDisplay.innerHTML = newLink.value;
            }

            if (showVoronoi) {
                ctx.strokeStyle='red';
                ctx.beginPath();
                voronoi.renderCell(cell, ctx);
                ctx.stroke();
            }
        }

        visitedCell = cell;
    }

    function handleMouseClickVoronoi(event) {
        let transformed = pixelToCanvas(event.layerX, event.layerY);
        let cell = delaunay.find(transformed.x, transformed.y)
        let node = voronoiCellToElement.get(cell)

        node.click();
    }

    handleMouseMoveVoronoiGlobal = handleMouseMoveVoronoi;
    handleMouseClickVoronoiGlobal = handleMouseClickVoronoi;

    window.addEventListener("resize", drawVoronoi)
    window.addEventListener("mousemove", handleMouseMoveVoronoiGlobal);
    window.addEventListener("touchmove", handleMouseMoveVoronoiGlobal);
    window.addEventListener("click", handleMouseClickVoronoiGlobal);
};

function eraseVoronoi() {
    window.removeEventListener("mousemove", handleMouseMoveVoronoiGlobal);
    window.removeEventListener("touchmove", handleMouseMoveVoronoiGlobal);
    window.removeEventListener("click", handleMouseClickVoronoiGlobal);
    window.removeEventListener("resize", drawVoronoi)

    if (oldLink !== undefined) {
        oldLink.style['outline'] = oldLinkStyle;
    }

    try{
        document.getElementById("attachedLinkOverlayForDelaunay").remove();
        document.getElementById("attachedCanvasOverlayForDelaunay").remove();
    }
    catch(TypeError) {
    }
}

function toggleVoronoi() {
    showVoronoi = !showVoronoi;
    drawVoronoi();
}

document.addEventListener("DOMContentLoaded", drawVoronoi);
