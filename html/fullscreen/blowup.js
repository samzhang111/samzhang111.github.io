var mathbox = mathBox({
  element: document.querySelector("#blowup"),
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

let blowupDelay = 3;

let origin3 = [0, -2, 0]
let origin = Array.concat(origin3, [0])

var camera = mathbox.camera({
    proxy: true,
}).play({
  pace: 5,
  script: [
      {props: {position: [1, 2, 1], lookAt: origin3}},
      {props: {position: [1.5, 1, 1.5], lookAt: [0, 0, 0]}},
  ]
})

mathbox.set('focus', 1);

let size = 2;
let xmin = ymin = zmin = -size;
let xmax = ymax = zmax = size;
let partitions = 17; // + 1

var view = mathbox.cartesian({
  range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
  scale: [1, 1, 1],
});

view.play({
  pace: 1,
  delay: blowupDelay,
  loop: false,
  script: [
      {props: {range: [[xmin - 0.01, xmax - 0.01], [ymin - 0.01, ymax - 0.01], [zmin - 0.01, zmax - 0.01]]}},
      {props: {range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]]}},
  ]
})

let colors = {
    x: new THREE.Color(0xFF4136),
    y: new THREE.Color(0x2ECC40),
    z: new THREE.Color(0x0074D9),
};

let defaultRange = [origin[1], origin[1]]

let xaxis = view
  .axis({
    axis: 1,
    width: 7,
    end: true,
    color: colors.x,
    origin,
  });

let zaxis = view.axis({
    axis: 3,
    width: 7,
    end: true,
    color: colors.z,
    origin,
  });


let grid = view.grid({
    axes: 'xz',
    width: 2,  
    divideX: 20,
    divideY: 20,
    lineX: true,
    lineY: true,
    origin,
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

function adjX(x) {
    //return (x + 1.2)/2.4
    return (x + 1.2)/7
}

let blowupGrid = view.interval({
    id: 'blowupGrid',
    channels: 3,
    items: 2,
    width: 50,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t, delta) {
        let curveX = x*x - 1
        let curveZ = x*x*x - x

        let h = Math.sqrt(curveX * curveX + curveZ * curveZ)
        let xCircle = curveX/h
        let zCircle = curveZ/h

        let xAdj = adjX(x)

        emit(-xCircle, xAdj * 2 * Math.PI, -zCircle)
        emit(xCircle, xAdj * 2 * Math.PI, zCircle)
    }
}).vector({ 
    id: 'blowupGridVector',
    width: 5,
    color: 'black',
    visible: false,
})

let projectiveLine = view.interval({
    id: 'projectiveLine',
    channels: 3,
    items: 2,
    width: 1,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t, delta) {
        emit(0, origin[1], 0)
        emit(0, x, 0)
    }
}).vector({
    width: 7,
    color: colors.y,
})

let projectiveIntersections = view.array({
    id: 'projectiveIntersections',
    channels: 3,
    items: 2,
    width: 1,
    live: true,
    data: [[0, 2*Math.PI*adjX(1), 0], [0, 2*Math.PI*adjX(-1), 0]]
}).point({
    size: 30,
    color: 'blue'
}).play({
    delay: blowupDelay,
    script: [
      {props: {size: 5, color: 'black'}},
      {props: {size: 30, color: 'blue'}},
    ],
})

let groundCurve = view.interval({
    id: 'groundCurve',
    channels: 3,
    items: 2,
    width: 128,
    live: true,
    range: [-1.28, 1.28],
    expr: function(emit, x, i, t, delta) {
        emit(x*x - 1, origin[1], x*x*x - x)
    }
}).line({
    width: 10,
    color: 'black'
}).play({
    delay: blowupDelay,
    script: [
        {props: {color: 'black'}},
        {props: {color: 'orange'}},
    ]
})

let blownUpCurve = view.interval({
    id: 'blownUpCurve',
    channels: 3,
    items: 2,
    width: 256,
    live: false,
    range: defaultRange,
    expr: function(emit, x, i, t) {
        let curveX = x*x - 1
        let curveZ = x*x*x - x

        let xAdj = adjX(x)

        emit(curveX, xAdj * 2 * Math.PI, curveZ)
    }
}).line({
    id: 'blownUpCurveLine',
    width: 30,
    color: 'orange',
})


let blownUpCurveGuidelines =  view.interval({
    id: 'blownUpCurveGuidelines',
    channels: 3,
    items: 2,
    width: 5,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t) {
        let curveX = x*x - 1
        let curveZ = x*x*x - x

        let xAdj = adjX(x)

        emit(curveX, origin[1], curveZ)
        emit(curveX, xAdj * 2 * Math.PI, curveZ)
    }
}).vector({
    id: 'blownUpCurveGuidelineLines',
    width: 5,
    color: 'orange',
    visible: false,
}).point({
    id: 'blownUpCurveGuidelinePointsPoints',
    size: 30,
    color: 'purple',
    visible: false,
})



// animations

function blowup(target, range) {
    view.play({ 
      target: target,
      delay: blowupDelay,
      script: [
        {props: {range: defaultRange}},
        {props: {range}},
      ],
    })
}

function makeVisible(target, delayOffset) {
    view.play({
        target: target,
        delay: blowupDelay + delayOffset,
        script: [
            {props: {visible: false}},
            {props: {visible: true}},
        ]
    })
}

view.play({
    target: '#blownUpCurve',
    delay: blowupDelay,
    script: [
        {props: {live: false}},
        {props: {live: true}},
    ]
})

let curveRange = [-1.2, 1.2]
let gridRange = [-1.3, 1.5]

blowup('#blowupGrid', gridRange)
blowup('#blownUpCurve', curveRange)
blowup('#blownUpCurveGuidelines', curveRange)
blowup('#blownUpCurveGuidelinePoints', curveRange)
blowup('#projectiveIntersections', curveRange)
blowup('#projectiveLine', [5, 5])

makeVisible('#blowupGridVector', -0.3)
makeVisible('#blownupCurveLine', -0.3)
makeVisible('#blownUpCurveGuidelineLines', 0.5)
makeVisible('#blownUpCurveGuidelinePointsPoints', 0.5)
