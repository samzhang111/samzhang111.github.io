(function(){
    var mathbox = mathBox({
      element: document.querySelector("#triangles-overlay"),
      plugins: ['core', 'controls', 'cursor', 'mathbox'],
      controls: {
        // Orbit controls, i.e. Euler angles, with gimbal lock
        klass: THREE.OrbitControls,

        // Trackball controls, i.e. Free quaternion rotation
        //klass: THREE.TrackballControls,
      },
      renderer: { parameters: { alpha: true } }
    });
    if (mathbox.fallback) throw "WebGL not supported"

    var three = mathbox.three;
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);
    three.renderer.setClearAlpha(0);

    var camera = mathbox.camera({
        proxy: true,
        position: [1, 0.4, 1]
    })
    mathbox.set('focus', 1);

    var size = 2;
    var xmin = ymin = zmin = -size;
    var xmax = ymax = zmax = size;

    var view = mathbox.cartesian({
      range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
      scale: [1, 1, 1],
    });

    var colors = {
        x: new THREE.Color(0xFF4136),
        y: new THREE.Color(0x2ECC40),
        z: new THREE.Color(0x0074D9),
    };

    var maxlen = 1000;
    var pointLeft = [];
    var pointRight = [];

    const perim = 1;
    const r = perim - 0.02



    // jsxgraph

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('triangle1', {
        boundingbox: [-xmax, ymax, xmax, -ymax],
        axis: true,
        pan: {
            needTwoFingers: true,
        }
    });

    const board2 = JXG.JSXGraph.initBoard('triangle2', {
        boundingbox: [-xmax, ymax, xmax, -ymax],
        axis: true,
        pan: {
            needTwoFingers: true,
        }
    });

    var p1 = board.create('point', [1, 0])
    var p2 = board.create('point', [0, 1])
    var p3 = board.create('point', [-1, -1])

    var s1 = board.create('segment', [p1, p2], {strokeColor: "orange"})
    var s2 = board.create('segment', [p2, p3], {strokeColor: "orange"})
    var s3 = board.create('segment', [p3, p1], {strokeColor: "orange"})

    var p1_b = board2.create('point', [1, 1])
    var p2_b = board2.create('point', [-0.5, 0.5])
    var p3_b = board2.create('point', [-1, -0.5])

    var s1_b = board2.create('segment', [p1_b, p2_b], {strokeColor: "green"})
    var s2_b = board2.create('segment', [p2_b, p3_b], {strokeColor: "green"})
    var s3_b = board2.create('segment', [p3_b, p1_b], {strokeColor: "green"})

    function normalize(v, scaleBy) {
        return math.multiply(scaleBy, math.divide(v, math.norm(v)))
    }

    function calculateA(point1, point2, point3) {
        var padX = -math.min(point1.X(), point2.X(), point3.X(), 0)
        var padY = -math.min(point1.Y(), point2.Y(), point3.Y(), 0)

        var p1c = math.complex({re: padX + point1.X(), im: padY + point1.Y()})
        var p2c = math.complex({re: padX + point2.X(), im: padY + point2.Y()})
        var p3c = math.complex({re: padX + point3.X(), im: padY + point3.Y()})

        var e1 = math.subtract(p1c, p3c)
        var e2 = math.subtract(p2c, p1c)
        var e3 = math.subtract(p3c, p2c)

        var sq1 = math.sqrt(e1)
        var sq2 = math.sqrt(e2)
        var sq3 = math.sqrt(e3)

        var u1 = [sq1.re, sq2.re, sq3.re]
        var v1 = [sq1.im, sq2.im, sq3.im]
        var u2 = [-sq1.re, sq2.re, sq3.re]
        var v2 = [-sq1.im, sq2.im, sq3.im]
        var u3 = [sq1.re, -sq2.re, sq3.re]
        var v3 = [sq1.im, -sq2.im, sq3.im]
        var u4 = [sq1.re, sq2.re, -sq3.re]
        var v4 = [sq1.im, sq2.im, -sq3.im]
        var u5 = [-sq1.im, -sq2.im, sq3.im]
        var v5 = [-sq1.re, -sq2.re, sq3.re]
        var u6 = [-sq1.im, sq2.im, -sq3.im]
        var v6 = [-sq1.re, sq2.re, -sq3.re]
        var u7 = [sq1.im, -sq2.im, -sq3.im]
        var v7 = [sq1.re, -sq2.re, -sq3.re]
        var u8 = [-sq1.im, -sq2.im, -sq3.im]
        var v8 = [-sq1.re, -sq2.re, -sq3.re]

        var z1 = normalize(math.cross(u1, v1), 2)
        var z2 = normalize(math.cross(u2, v2), 2)
        var z3 = normalize(math.cross(u3, v3), 2)
        var z4 = normalize(math.cross(u4, v4), 2)
        var z5 = normalize(math.cross(u5, v5), 2)
        var z6 = normalize(math.cross(u6, v6), 2)
        var z7 = normalize(math.cross(u7, v7), 2)
        var z8 = normalize(math.cross(u8, v8), 2)

        return [z1, z2, z3, z4, z5, z6, z7, z8]
    }

    board.on('update', function() {
        pointLeft = calculateA(p1, p2, p3)
    })

    board2.on('update', function() {
        pointRight = calculateA(p1_b, p2_b, p3_b)
    })

    pointLeft = calculateA(p1, p2, p3)
    pointRight = calculateA(p1_b, p2_b, p3_b)

    // draw
    //
    view.array({
        channels: 3,
        items: 4,
        width: maxlen,
        expr: function(emit, x, i, t, delta) {
            for (var i = 0; i < pointLeft.length; i++) {
                var u = pointLeft[i]

                emit(0, 0, 0)
                emit(u[0], u[1], u[2])
            }
        },
    }).vector({
        width: 3,
        color: "orange",
    })

    view.array({
        channels: 3,
        items: 4,
        width: maxlen,
        expr: function(emit, x, i, t, delta) {
            for (var i = 0; i < pointRight.length; i++) {
                var u = pointRight[i]

                emit(0, 0, 0)
                emit(u[0], u[1], u[2])
            }
        },
    }).vector({
        width: 3,
        color: "green",
    })

    view.array({
        channels: 3,
        items: 4,
        width: maxlen,
        expr: function(emit, x, i, t, delta) {
            var u = pointLeft[0]

            emit(0, 0, 0)
            emit(math.abs(u[0]), math.abs(u[1]), math.abs(u[2]))
        },
    }).vector({
        width: 10,
        color: "orange",
    })

    view.array({
        channels: 3,
        items: 4,
        width: maxlen,
        expr: function(emit, x, i, t, delta) {
            var u = pointRight[0]

            emit(0, 0, 0)
            emit(math.abs(u[0]), math.abs(u[1]), math.abs(u[2]))
        },
    }).vector({
        width: 10,
        color: "green",
    })

    function geo(t) {
            var u0 = math.abs(pointLeft[0])
            var u = normalize(u0, 1)
            var v0 = math.abs(pointRight[0])
            var v = normalize(v0, 1)

            var w0 = math.subtract(u, math.multiply(math.dot(u, v), v))
            var w = normalize(w0, 1)

            t = t*Math.acos(math.dot(u, v))

            return [
                Math.cos(t)*v[0] + Math.sin(t)*w[0],
                Math.cos(t)*v[1] + Math.sin(t)*w[1],
                Math.cos(t)*v[2] + Math.sin(t)*w[2],
            ]
    }

    var geodesic = view.interval({
        channels: 3,
        width: maxlen,
        range: [0, 1],
        expr: function(emit, x, i, t, delta) {
            var g = geo(x)

            emit(g[0], g[1], g[2])
        },
    }).line({
        width: 5,
        color: "yellow",
    })

    function pointToTriangle(p) {
            var u = math.abs(p)
            var v = [0, 1, -u[1]/u[2]]
            var w = math.cross(u, v)

            var vnorm = normalize(v, Math.sqrt(perim/2))
            var wnorm = normalize(w, Math.sqrt(perim/2))

            return [
                [0, 0],
                [vnorm[0]**2 - wnorm[0]**2, 2*vnorm[0]*wnorm[0]],
                [vnorm[1]**2 - wnorm[1]**2 + vnorm[0]**2 - wnorm[0]**2, 2*vnorm[1]*wnorm[1] + 2*vnorm[0]*wnorm[0]]
            ]
    }

    view.area({
      width: 64,
      height: 64,
      rangeX: [0, 2*Math.PI],
      rangeY: [0, Math.PI],
      axes: [1, 3],
      expr: function (emit, x, y, i, j, time) {
          emit(r*Math.cos(x)*Math.sin(y), r*Math.sin(x)*Math.sin(y), r*Math.cos(y));
      },
      live: false,
      items: 1,
      channels: 3,
      fps: 1,
    }).surface({
      opacity: 0.3,
      lineX: true,
      lineY: true,
      color: "purple",
      width: 3,
      fill: false,
    })

    view.area({
      width: 64,
      height: 64,
      rangeX: [0, Math.PI/2],
      rangeY: [0, Math.PI/2],
      axes: [1, 3],
      expr: function (emit, x, y, i, j, time) {
          emit(r*Math.cos(x)*Math.sin(y), r*Math.sin(x)*Math.sin(y), r*Math.cos(y));
      },
      live: false,
      items: 1,
      channels: 3,
      fps: 1,
    }).surface({
      opacity: 0.5,
      color: "blue",
      fill: true,
    })

    // code for triangles

    var mathbox2 = mathBox({
      element: document.querySelector("#triangles-grassman"),
      plugins: ['core', 'controls', 'cursor', 'mathbox'],
      controls: {
        // Orbit controls, i.e. Euler angles, with gimbal lock
        klass: THREE.OrbitControls,

        // Trackball controls, i.e. Free quaternion rotation
        //klass: THREE.TrackballControls,
      },
      renderer: { parameters: { alpha: true } }
    });
    if (mathbox.fallback) throw "WebGL not supported"

    var three2 = mathbox2.three;
    three2.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);
    three2.renderer.setClearAlpha(0);

    var camera2 = mathbox2.camera({
        proxy: true,
        position: [0.75, 0, 0.2]
    })
    mathbox2.set('focus', 1);

    var view2 = mathbox2.cartesian({
      range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
      scale: [1, 1, 1],
    });

    var colorsRaw = [new THREE.Color(0x008000), new THREE.Color(0x248200), new THREE.Color(0x3a8500), new THREE.Color(0x4a8800), new THREE.Color(0x578a00), new THREE.Color(0x658d00), new THREE.Color(0x719000), new THREE.Color(0x7c9200), new THREE.Color(0x879400), new THREE.Color(0x929600), new THREE.Color(0x9d9800), new THREE.Color(0xa89900), new THREE.Color(0xb49c00), new THREE.Color(0xbe9d00), new THREE.Color(0xc99f00), new THREE.Color(0xd5a000), new THREE.Color(0xdfa100), new THREE.Color(0xe9a300), new THREE.Color(0xf5a400), new THREE.Color(0xffa500)]


    var colorsSplit = []
    for (var i = 0; i<colorsRaw.length; i++) {
        colorsSplit.push([colorsRaw[i].r, colorsRaw[i].g, colorsRaw[i].b, 1])
    }

    var colors20 = view2.array({
        id: 'colors20',
        channels: 4,
        items: 1,
        width: 20,
        data: colorsSplit
    })


    // triangle
    view2.interval({
        channels: 3,
        items: 4,
        width: 20,
        range: [0, 1],
        expr: function(emit, x, i, t, delta) {
            var gp = geo(x)
            var tri = pointToTriangle(gp)

            emit(x - 0.5, tri[0][0], tri[0][1])
            emit(x - 0.5, tri[1][0], tri[1][1])
            emit(x - 0.5, tri[2][0], tri[2][1])
            emit(x - 0.5, tri[0][0], tri[0][1])
        },
    }).vector({
        width: 5,
        colors: '#colors20',
        color: "white",
        opacity: 0.7,
    })
})()
