var mathbox = mathBox({
  element: document.querySelector("#blowup-cusp"),
  plugins: ['core', 'controls', 'cursor', 'mathbox'],
  controls: {
    // Orbit controls, i.e. Euler angles, with gimbal lock
    klass: THREE.OrbitControls,

    // Trackball controls, i.e. Free quaternion rotation
    //klass: THREE.TrackballControls,
    parameters: {
        noKeys: true,
    }
  },
  renderer: { parameters: { alpha: true } }
});
if (mathbox.fallback) throw "WebGL not supported"

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);
three.renderer.setClearAlpha(0);
let origin3 = [0, -2, 0]
let origin = Array.concat(origin3, [0])

let secondOrigin = [0, 0, -4];

if (window == top)
  window.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
      case 38:
        present.set('index', present.get('index') - 1);
        break;
      case 39:
      case 40:
        present.set('index', present.get('index') + 1);
        break;
    }
    console.log(present.get('index'));
}

var camera = mathbox.camera({
    proxy: true,
    position: [1, 1, 3],
})

mathbox.set('focus', 1);

let size = 2;
let xmin = ymin = zmin = -size;
let xmax = ymax = zmax = size;
let partitions = 17; // + 1
let curveRange = [-0.88, 0.88]
let gridRange = [-1.3, 1.5]

var view = mathbox.cartesian({
  range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
  scale: [1, 1, 1],
});

var present = view.present({
  index: 0
})

let colors = {
    x: new THREE.Color(0xFF4136),
    y: new THREE.Color(0x2ECC40),
    z: new THREE.Color(0x0074D9),
};

let defaultRange = [origin[1], origin[1]]


let grid = view.grid({
    axes: 'xz',
    width: 2,  
    divideX: 20,
    divideY: 20,
    lineX: true,
    lineY: true,
    origin,
  });

let data =
  view.interval({
    expr: function (emit, x, i, t) {
      emit(x, Math.sin(x + t));
    },
    width: 64,
    channels: 2,
  });


let circle = view.interval({
    channels: 3,
    items: 1,
    width: 64,
    range: [0, 2*Math.PI],
    live: false,
    expr: function(emit, x, i, t, delta) {
        emit(Math.cos(x), origin[1], Math.sin(x))
    }
}).line({
    width: 10,
    color: 'black',
    //    stroke: 'dashed',
})

let groundCurve = view.interval({
    id: 'groundCurve',
    channels: 3,
    items: 2,
    width: 128,
    live: true,
    range: curveRange,
    expr: function(emit, x, i, t, delta) {
        emit(x*x, origin[1], x*x*x)
    }
}).line({
    width: 10,
    color: 'black'
})

let blowupGrid = view.interval({
    id: 'blowupGrid',
    channels: 3,
    items: 2,
    width: 50,
    live: true,
    range: gridRange,
    expr: function(emit, x, i, t, delta) {
        let curveX = x*x
        let curveZ = x*x*x

        let h = Math.sqrt(curveX * curveX + curveZ * curveZ)
        let xCircle = curveX/h
        let zCircle = curveZ/h

        emit(-xCircle, zCircle / xCircle, -zCircle)
        emit(xCircle, zCircle / xCircle, zCircle)
    }
});

let projectiveLine = view.interval({
    id: 'projectiveLine',
    channels: 3,
    items: 2,
    width: 1,
    live: true,
    range: [3, 3],
    expr: function(emit, x, i, t, delta) {
        emit(0, origin[1], 0)
        emit(0, x, 0)
    }
})

let blownUpCurve = view.interval({
    id: 'blownUpCurve',
    channels: 3,
    items: 2,
    width: 256,
    live: false,
    range: curveRange,
    expr: function(emit, x, i, t) {
        let curveX = x*x 
        let curveZ = x*x*x 

        emit(curveX, curveZ / curveX, curveZ)
    }
})

let slide1_blowup = present.slide({
    from: 1,
    to: 8,
})

let step1 = slide1_blowup.step().reveal({
    duration: 1,
    stagger: [0, -2, 0, 0]
})

step1.vector({ 
    id: 'blowupGridVector',
    points: blowupGrid,
    width: 5,
    color: 'black',
})

step1.vector({
    width: 7,
    points: projectiveLine,
    color: colors.y,
})

step1.line({
    id: 'blownUpCurveLine',
    points: blownUpCurve,
    width: 30,
    color: 'orange',
})

step1.array({
    channels: 3,
    items: 1,
    data: [[0, 0, 0]]
}).point({
    size: 50,
    color: 'red'
})

let slide2_project = present.slide({
    from: 2,
    to: 3,
})

let slide2_guidelines = present.slide({
    from: 2,
    to: 3,
})

let step2 = slide2_project.step().reveal({
    duration: 1,
    stagger: [0, -2, 0, 0]
})

let step2g = slide2_guidelines.step().reveal({
    duration: 1,
    stagger: [0, -2, 0, 0]
})

let xyplaneOffset = -2;

let projGrid = step2.area({
    id: 'grid2',
    width: 32,
    height: 32,
    axes: 'xy',
    centeredX: true,
    centeredY: true,
    channels: 3,
    rangeX: [-1.5, 1.5],
    rangeY: [-1.5, 1.5],
    expr: function(emit, x, y, i, j, time, delta) {
        emit(x, y, xyplaneOffset)
    },
});

let projGridSurface = step2.surface({
    shaded: false,
    lineX: true,
    lineY: true,
    points: projGrid,
    fill: false,
})

let blownUpCurveProj = view.interval({
    id: 'blownUpCurveProj',
    channels: 3,
    items: 2,
    width: 256,
    live: false,
    range: curveRange,
    expr: function(emit, x, i, t) {
        let curveX = x*x
        let curveZ = x*x*x

        emit(curveX, curveZ / curveX, xyplaneOffset)
    }
})

let exceptionalLineProj = view.interval({
    id: 'exceptionalLineProj',
    channels: 3,
    items: 2,
    width: 1,
    live: true,
    range: [3, 3],
    expr: function(emit, x, i, t, delta) {
        emit(0, origin[1], xyplaneOffset)
        emit(0, x, xyplaneOffset)
    }
})


step2.line({
    points: blownUpCurveProj,
    id: 'blownUpCurveLineProj',
    width: 30,
    color: 'orange',
})

step2.vector({
    points: exceptionalLineProj,
    width: 7,
    color: colors.y,
})

step2.array({
    channels: 3,
    items: 1,
    data: [[0, 0, xyplaneOffset]]
}).point({
    size: 50,
    color: 'red'
})

let blownUpCurveGuidelinesProj =  view.interval({
    id: 'blownUpCurveGuidelinesProj',
    channels: 3,
    items: 2,
    width: 5,
    live: true,
    range: curveRange,
    expr: function(emit, x, i, t) {
        let curveX = x*x
        let curveZ = x*x*x

        emit(curveX, curveZ / curveX, curveZ)
        emit(curveX, curveZ / curveX, xyplaneOffset)
    }
})

step2g.vector({
    points: blownUpCurveGuidelinesProj,
    width: 5,
    color: 'orange',
})

step2g.point({
    points: blownUpCurveGuidelinesProj,
    size: 30,
    color: 'purple',
})


let slide3 = present.slide({
    from: 3,
    to: 8,
})

let step3 = slide3.step().reveal({
    duration: 1,
    stagger: [0, -2, 0, 0]
})

let step3rot = step3.transform({
    rotation: [-Math.PI/2, 0, Math.PI/2],
    position: secondOrigin,
})

step3rot.surface({
    shaded: false,
    lineX: true,
    lineY: true,
    points: projGrid,
    fill: false,
})

step3rot.line({
    points: blownUpCurveProj,
    width: 30,
    color: 'orange',
})

step3rot.vector({
    points: exceptionalLineProj,
    width: 7,
    color: colors.y,
})

step3rot.array({
    channels: 3,
    items: 1,
    data: [[0, 0, xyplaneOffset]]
}).point({
    size: 50,
    color: 'red'
})

step3.play({
    target: view,
    script: {
        "2": {position: [0, 0, 0]},
        "3": {position: [0, 0, 2]}
    }
})

step3.play({
    target: camera,
    script: {
        "2": {proxy: true, position: [1, 1, 3], up: [0, 1, 0]},
        "3": {proxy: true, position: [4, 2, -2], up: [0, 1, 0]},
    }
})

let slide4 = present.slide({
    from: 4,
    to: 8,
})

let step4 = slide4.step().reveal({
    duration: 1,
    stagger: [0, -2, 0, 0]
})

let blowup2Curve = view.interval({
    id: 'blownUpCurve2',
    channels: 3,
    items: 2,
    width: 64,
    live: false,
    range: curveRange,
    expr: function(emit, x, i, t) {
        emit(x, x, -x*x - 4)
    }
})

let blowup2Grid = view.interval({
    id: 'blownUpGrid2',
    channels: 3,
    items: 2,
    width: 50,
    live: true,
    range: gridRange,
    expr: function(emit, x, i, t, delta) {
        let curveX = x
        let curveZ = x*x

        let h = Math.sqrt(curveX * curveX + curveZ * curveZ)
        let xCircle = curveX/h
        let zCircle = curveZ/h

        emit(-xCircle, x, zCircle - 4)
        emit(xCircle, x, -zCircle - 4)
    }
});


let blowup2Divisor = view.interval({
    id: 'blownUpDivisor',
    channels: 3,
    items: 2,
    width: 50,
    live: true,
    range: gridRange,
    expr: function(emit, x, i, t, delta) {
        emit(-x, x, -4)
    }
})

let blowup2ExceptionalLine = view.interval({
    id: 'blowup2ExceptionalLine',
    channels: 3,
    items: 2,
    width: 1,
    live: true,
    range: [3, 3],
    expr: function(emit, x, i, t, delta) {
        emit(0, origin[1], -4)
        emit(0, x, -4)
    }
})


step4.line({
    points: blowup2Curve,
    width: 30,
    color: 'orange',
})

step4.vector({ 
    points: blowup2Grid,
    width: 5,
    color: 'black',
})

step4.line({
    points: blowup2Divisor,
    width: 7,
    color: colors.y,
})

step4.vector({
    points: blowup2ExceptionalLine,
    width: 7,
    color: "purple",
})

// project second blowup

let slide5 = present.slide({
    from: 5,
    to: 6,
})

let step5 = slide5.step().reveal({
    duration: 1,
    stagger: [0, -2, 0, 0]
})


let proj2Grid = step5.area({
    id: 'grid3',
    width: 32,
    height: 32,
    axes: 'xy',
    centeredX: true,
    centeredY: true,
    channels: 3,
    rangeX: [-1.5, 1.5],
    rangeY: [-1.5, 1.5],
    expr: function(emit, x, y, i, j, time, delta) {
        emit(x, y, -6)
    },
});

let blownUpCurveProj2 = step5.interval({
    id: 'blownUpCurveProj2',
    channels: 3,
    items: 2,
    width: 256,
    live: false,
    range: curveRange,
    expr: function(emit, x, i, t) {
        emit(x, x, -6)
    }
})

let blownUpDivisor1Proj2 = step5.interval({
    channels: 3,
    items: 2,
    width: 1,
    live: true,
    range: [1.5, 1.5],
    expr: function(emit, x, i, t, delta) {
        emit(x, -x, -6)
        emit(-x, x, -6)
    }
})

let blownUpDivisor2Proj2 = step5.interval({
    channels: 3,
    items: 2,
    width: 1,
    live: true,
    range: [3, 3],
    expr: function(emit, x, i, t, delta) {
        emit(0, origin[1], -6)
        emit(0, x, -6)
    }
})

let projGridSurface2 = step5.surface({
    shaded: false,
    lineX: true,
    lineY: true,
    points: proj2Grid,
    fill: false,
})

let projCurve2 = step5.line({
    points: blownUpCurveProj2,
    width: 30,
    color: "orange",
})

let proj2Divisor1 = step5.vector({
    points: blownUpDivisor1Proj2,
    width: 7,
    color: colors.y,
})

let proj2Divisor2 = step5.vector({
    points: blownUpDivisor2Proj2,
    width: 7,
    color: "purple"
})

let slide6 = present.slide({
    from: 6,
    to: 8,
})

let step6r = slide6.step().reveal({
    duration: 1,
    stagger: [0, -2, 0, 0]
})


let step6rot = step6r.transform({
    rotation: [Math.PI/2, 0, Math.PI/2],
    position: [0, -8, -8],
})

step6rot.surface({
    shaded: false,
    lineX: true,
    lineY: true,
    points: proj2Grid,
    fill: false,
})

step6rot.line({
    points: blownUpCurveProj2,
    width: 30,
    color: "orange",
})

step6rot.vector({
    points: blownUpDivisor1Proj2,
    width: 7,
    color: colors.y,
})

step6rot.vector({
    points: blownUpDivisor2Proj2,
    width: 7,
    color: "purple"
})

