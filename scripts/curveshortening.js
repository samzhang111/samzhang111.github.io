function drawPointsUnitCircle(n, board, onDrag) {
    /* draw jsxgraph points on the unit circle */

    var points = []
    for (var i = 0; i < n; i++) {
        var x = Math.cos(i/n * 2 * Math.PI)
        var y = Math.sin(i/n * 2 * Math.PI)
        
        var point = board.create('point', [x, y], {name: i, size:2})
        point.on("drag", onDrag)
        points.push(point)
    }

    return points
}


function getPointDataCircular(points) {
    /* get points from jsxgraph points object, with the first element repeated */
    var pointData = []

    points.forEach(function(p)  {
        pointData.push([p.X(), p.Y()])
    })

    pointData.push([points[0].X(), points[0].Y()])

    return pointData
}


function discreteNormal (x1, x2, x3) {
    return [
        (x3[0] - x2[0]) + (x1[0] - x2[0]),
        (x3[1] - x2[1]) + (x1[1] - x2[1])
    ]
}

function chowGlickStepPoint (x1, x2, x3, delta) {
    var dn = discreteNormal(x1, x2, x3)

    return [
        x2[0] + delta*dn[0],
        x2[1] + delta*dn[1],
    ]
}


function chowGlickStep (points, delta, z) {
    /* given an array of points that define the boundary of a polygon, with the first entry repeated,
     * return the new polygon formed by performing one Chow-Glickenstein update
     * on each point */
    var N = points.length - 1
    var pt = chowGlickStepPoint(points[N-1], points[0], points[1], delta)
    var newPoints = [[pt[0], pt[1], z]]

    for (var i = 1; i <= N - 1; i++) {
        var x1 = points[i-1]
        var x2 = points[i]
        var x3 = points[i+1]

        pt = chowGlickStepPoint(x1, x2, x3, delta)
        newPoints.push([pt[0], pt[1], z])
    }

    pt = chowGlickStepPoint(points[N-1], points[0], points[1], delta)
    newPoints.push([pt[0], pt[1], z])

    return newPoints
}


function shortenCurve (points, delta, iters) {
    /* given points that define the boundary of a polygon, shorten the curve
     *
     * delta: step size
     * iters: number of times to repeat shortening
     *
     * returns a list of lists
     * */

    var nextCurve = points
    var shortenedCurves = []

    for (var i = 0; i < iters; i++) {
        nextCurve = chowGlickStep(nextCurve, delta, Math.sqrt((i + 1)/(iters + 1)))
        shortenedCurves.push(nextCurve)
    }

    return shortenedCurves
}


(function(){
    var size = 2;
    var xmin = ymin = zmin = -size;
    var xmax = ymax = zmax = size;
    var mbxmin = xmin* 2
    var mbxmax = xmax* 2

    var delta = 0.1
    var numIters = 40
    var currentIterCap = numIters
    var MAX_ITERS = 100

    //**********************
    // mathbox (2d)
    //**********************

    var mathbox2d = mathBox({
      element: document.querySelector("#curve-2d"),
      plugins: ['core', 'controls', 'cursor', 'mathbox'],
      controls: {
        // Orbit controls, i.e. Euler angles, with gimbal lock
        klass: THREE.OrbitControls,

        // Trackball controls, i.e. Free quaternion rotation
        //klass: THREE.TrackballControls,
      },
      renderer: { parameters: { alpha: true } }
    });
    if (mathbox2d.fallback) throw "WebGL not supported"

    var three = mathbox2d.three;
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);
    three.renderer.setClearAlpha(0);

    var camera = mathbox2d.camera({
        proxy: true,
        position: [0, 0, 3]
    })
    mathbox2d.set('focus', 1);


    var view = mathbox2d.cartesian({
      range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
      scale: [2, 2, 3],
    });

    view.axis({
      detail: 30,
    });

    view.grid({
      divideX: 10,
      width: 2,
      opacity: 0.8,
      zBias: -5,
    });

    var colors = {
        x: new THREE.Color(0xFF4136),
        y: new THREE.Color(0x2ECC40),
        z: new THREE.Color(0x0074D9),
    };

    var colorscale = chroma.scale(['008ae5', 'yellow']).domain([0,numIters+1]);

    view.array({
        id: 'curve',
        data: [[0, 0], [0, 0], [0, 0]],
        channels: 2,
        live: false
    })

    view.line({
        points: '#curve',
        color: colorscale(0).hex(),
        width: 10,
        join: 'round',
    });

    var currentCurve = [[0, 0], [0, 0], [0, 0]]
    var shortenedCurves = [ currentCurve ]
    /*
    view.interval({
      id: 'shortenedCurve',
      width: 3,
      expr: function (emit, x, i, t) {
          emit(currentCurve[i][0], currentCurve[i][1])
      },
      channels: 2,
    })

    view.line({
        points: '#shortenedCurve',
        color: 0x3090FF,
        width: 5,
    })
    */

    var mathboxCartesian = mathbox2d.select('cartesian')
    var mathboxCurveData = mathbox2d.select('#curve')
    var mathboxShortenedCurve = mathbox2d.select('#shortenedCurve')
    var shortenedCurveDataSelectors = []
    var shortenedCurveSelectors = []

    var nullData3d = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    for (var i = 0; i < currentIterCap; i++) {
        view.array({
            id: `curve${i}`,
            data: nullData3d,
            channels: 3,
            live: false
        })

        view.line({
            id: `curve${i}line`,
            points: `#curve${i}`,
            color: colorscale(i+1).hex(),
            width: 3,
            opacity: 0.9,
            join: 'round',
        });

        shortenedCurveDataSelectors.push(mathbox2d.select(`#curve${i}`))
        shortenedCurveSelectors.push(mathbox2d.select(`#curve${i}line`))
    }



    function updateMathbox2dPlot() {
        var width = numNodesSlider.Value() + 1
        var pointData = getPointDataCircular(points)
        mathboxCurveData.set('data', pointData);
        mathboxShortenedCurve.set('width', width)
        currentCurve = pointData

        shortenedCurves = shortenCurve(currentCurve, delta, numIters)

        for (var i = currentIterCap; i < numIters; i++) {
            view.array({
                id: `curve${i}`,
                data: nullData3d,
                channels: 3,
                live: false
            })

            view.line({
                id: `curve${i}line`,
                points: `#curve${i}`,
                color: colorscale(i+1).hex(),
                width: 3,
                opacity: 0.9,
                join: 'round',
            });

            shortenedCurveDataSelectors.push(mathbox2d.select(`#curve${i}`))
            shortenedCurveSelectors.push(mathbox2d.select(`#curve${i}line`))
        }

        currentIterCap = Math.max(currentIterCap, numIters)

        for (var i = 0; i < numIters; i++) {
            shortenedCurveSelectors[i].set('width', width)
            shortenedCurveDataSelectors[i].set('data', shortenedCurves[i])
        }

        for (var j = numIters; j < currentIterCap; j++) {
            shortenedCurveDataSelectors[j].set('data', nullData3d)
        }
    }


    /************
     * JSX Graph
     ************/

    JXG.Options.layer['polygon'] = 8;
    var board = JXG.JSXGraph.initBoard('control', {
        boundingbox: [-xmax, ymax, xmax, -ymax],
        axis: true,
        pan: {
            needTwoFingers: true,
        }
    });

    var numNodesSlider = board.create('slider', [[-0.8, 1.3], [0.8, 1.3], [3, 10, 20]], {name:'# points', size: 7, label: {fontSize: 13}, snapWidth: 1, precision: 0});
    var deltaSlider = board.create('slider', [[-0.8, -1.3], [0.8, -1.3], [0.01, delta, 1]], {name:'delta', size: 7, label: {fontSize: 13}, snapWidth: 0.01, precision: 2});
    var numItersSlider = board.create('slider', [[-0.8, -1.5], [0.8, -1.5], [1, numIters, MAX_ITERS]], {name:'iters', size: 7, label: {fontSize: 13}, snapWidth: 1, precision: 0});

    points = drawPointsUnitCircle(numNodesSlider.Value(), board, updateMathbox2dPlot)
    var polygon = board.create('polygon', points, { borders:{strokeColor:'black'} });
    polygon.on("drag", updateMathbox2dPlot)

    function updateNumNodes () {
        polygon.remove()
        points.forEach(function(p) {
            p.remove()
        }) 

        points = drawPointsUnitCircle(numNodesSlider.Value(), board, updateMathbox2dPlot)
        polygon = board.create('polygon', points, { borders:{strokeColor:'black'} });
        polygon.on("drag", updateMathbox2dPlot)
        updateMathbox2dPlot()
    }

    numNodesSlider.on("drag", updateNumNodes)
    numItersSlider.on("drag", function() {
        numIters = numItersSlider.Value()
        colorscale = colorscale.domain([0,numIters+1]);
        updateMathbox2dPlot()
    })
    deltaSlider.on("drag", function() {
        delta = deltaSlider.Value()
        updateMathbox2dPlot()
    })

    updateNumNodes()
})()

