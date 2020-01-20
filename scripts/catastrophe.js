(function(){
    var mathbox = mathBox({
      element: document.querySelector("#catastrophe-surface"),
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
        position: [1, 2, 0]
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

    var centerOfMass = {
        a: 0.1,
        b: 0.5
    }

    var minimizer = solveCubicPickMin(2, 0, 1-2*centerOfMass.b, -centerOfMass.a)

    var sampler = view.area({
      id: 'sampler',
      width: 64,
      height: 64,
      axes: [1, 3],
      rangeX: [-1, 1],
      rangeY: [0, 1],
      expr: function (emit, t, b, i, j, time) {
        emit(b, t, 2*t**3 + t*(1 - 2*b))
      },
      live: false,
      items: 1,
      channels: 3,
    }).surface({
      shaded: true,
      lineX: true,
      lineY: true,
      color: 'orange',
      width: 1,
      fill: false
    });


    // update center of mass on catastrophe surface
    view.interval({
        channels: 3,
        width: 64,
        range: [-1, 1],
        expr: function(emit, x, i, t) {
            var a = centerOfMass.a
            var b = centerOfMass.b

            emit(b, -10, a)
            emit(b, 10, a)
        },
    }).line({
        width: 10,
        color: "green",
    })

    // draw parabola on surface
    view.interval({
        channels: 3,
        width: 64,
        live: false,
        range: [-1, 1],
        expr: function(emit, x, i, t) {
            var tvar = solveCubic(2, 0, 1-2*x**2, -x)

            emit(x**2, tvar, x)
        },
    }).line({
        width: 10,
        color: 0x3090FF,
    })
    

    // draw b curve
    view.interval({
        channels: 3,
        width: 64,
        live: false,
        range: [-1, 1],
        expr: function(emit, x, i, t) {
            emit(0.5*(1 + 6*x**2), x, -4*x**3)
        },
    }).line({
        width: 10,
        color: 0x3090FF,
    })
    



    // jsxgraph

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('control', {
        boundingbox: [-xmax, ymax, xmax, -ymax],
        axis: true,
        pan: {
            needTwoFingers: true,
        }
    });

    var focus = board.create('point', [0, 0.25], {visible: false})
    var d1 = board.create('point', [-2, -0.25], {visible: false})
    var d2 = board.create('point', [2, -0.25], {visible: false})

    var p1 = board.create('point', [-1, 1], {visible: false})
    var p2 = board.create('point', [1, 1], {visible: false})
    var minimizerpt = board.create('point', [function() {
        return minimizer
    }, function() {
        return minimizer**2
    }], {fixed: true, color: 'red', size: 1, name: ''})

    var minimizerIntersection = board.create('point', [0, function() { return -(minimizer**2)}], {
        visible: false
    })

    var groundLine = board.create('line', [minimizerIntersection, minimizerpt], {
        fixed: true,
        withLabel: true,
        name: 'ground',
        label: {position: 'bot'},
        dash: 2,
    })

    var parabola = board.create('functiongraph', [function(x) {
        return x**2;
    }, -1, 1], {fixed: true, strokeWidth: 3})
    var boundingLine = board.create('segment', [p1, p2], {fixed: true, strokeWidth: 3})

    var controlpt = board.create('point', [centerOfMass.a, centerOfMass.b], {'name': 'center of mass (move me)', color: 'green'})

    var bcurve = board.create('curve', 
        [
            function(t) { return -4*t**3 },
            function(t) { return 0.5*(1 + 6*t**2) },
            -1, 1
        ], {dash: 1})

    // keep center of gravity within board

    board.on('move', function() {

        board.suspendUpdate();

        var x = controlpt.X()
        var y = controlpt.Y()
    
        controlpt.moveTo([
            Math.min(1, Math.max(-1, x)),
            Math.min(1, Math.max(x**2, y))
        ])

       board.unsuspendUpdate();
     });

    board.on('update', function() {
        centerOfMass['a'] = controlpt.X()
        centerOfMass['b'] = controlpt.Y()

        minimizer = solveCubicPickMin(2, 0, 1-2*centerOfMass.b, -centerOfMass.a)
    })

    // potential energy board

    var potential = board.create('functiongraph',
            function(t) {
                var a = controlpt.X()
                var b = controlpt.Y()

                return (b - 2*t*a + t**2)/Math.sqrt(1 + 4*t**2)
            },
            {strokeColor: 'orange', strokeWidth: 3, name: 'potential', withLabel: true, label: {position: 'ulft'}}
        )

    potential.addParents([controlpt])
    board.update()
    groundLine.update()

    function evaluateV(t) {
        return (centerOfMass.b - 2*t*centerOfMass.a + t**2)/(Math.sqrt(1 + 4*t**2))
    }

    function solveCubicPickMin(a, b, c, d) {
        var roots = solveCubic(a, b, c, d)

        var currentSmallestRoot = roots[0]
        var currentSmallestRootValue = evaluateV(roots[0])

        roots.forEach(function(root) {
            var value = evaluateV(root)

            if (value < currentSmallestRootValue) {
                currentSmallestRoot = root
                currentSmallestRootValue = value
            }
        })

        return currentSmallestRoot
    }

})()

// from https://stackoverflow.com/questions/27176423/function-to-solve-cubic-equation-analytically

function cuberoot(x) {
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
}


function solveCubic(a, b, c, d) {
    if (Math.abs(a) < 1e-8) { // Quadratic case, ax^2+bx+c=0
        a = b; b = c; c = d;
        if (Math.abs(a) < 1e-8) { // Linear case, ax+b=0
            a = b; b = c;
            if (Math.abs(a) < 1e-8) // Degenerate case
                return [];
            return [-b/a];
        }

        var D = b*b - 4*a*c;
        if (Math.abs(D) < 1e-8)
            return [-b/(2*a)];
        else if (D > 0)
            return [(-b+Math.sqrt(D))/(2*a), (-b-Math.sqrt(D))/(2*a)];
        return [];
    }

    // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
    var p = (3*a*c - b*b)/(3*a*a);
    var q = (2*b*b*b - 9*a*b*c + 27*a*a*d)/(27*a*a*a);
    var roots;

    if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
        roots = [cuberoot(-q)];
    } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
        roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
    } else {
        var D = q*q/4 + p*p*p/27;
        if (Math.abs(D) < 1e-8) {       // D = 0 -> two roots
            roots = [-1.5*q/p, 3*q/p];
        } else if (D > 0) {             // Only one real root
            var u = cuberoot(-q/2 - Math.sqrt(D));
            roots = [u - p/(3*u)];
        } else {                        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
            var u = 2*Math.sqrt(-p/3);
            var t = Math.acos(3*q/p/u)/3;  // D < 0 implies p < 0 and acos argument in [-1..1]
            var k = 2*Math.PI/3;
            roots = [u*Math.cos(t), u*Math.cos(t-k), u*Math.cos(t-2*k)];
        }
    }

    // Convert back from depressed cubic
    for (var i = 0; i < roots.length; i++)
        roots[i] -= b/(3*a);

    return roots;
}
