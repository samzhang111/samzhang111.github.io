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

var blowupDelay = 3;

var origin3 = [0, -2, 0]
var origin = origin3.concat([0])

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

var size = 2;
var xmin = ymin = zmin = -size;
var xmax = ymax = zmax = size;
var partitions = 17; // + 1

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

var colors = {
    x: new THREE.Color(0xFF4136),
    y: new THREE.Color(0x2ECC40),
    z: new THREE.Color(0x0074D9),
};

var defaultRange = [origin[1], origin[1]]

var xaxis = view
  .axis({
    axis: 1,
    width: 7,
    end: true,
    color: colors.x,
    origin,
  });

var zaxis = view.axis({
    axis: 3,
    width: 7,
    end: true,
    color: colors.z,
    origin,
  });


var grid = view.grid({
    axes: 'xz',
    width: 2,  
    divideX: 20,
    divideY: 20,
    lineX: true,
    lineY: true,
    origin,
  });

var circle = view.interval({
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

var blowupGrid = view.interval({
    id: 'blowupGrid',
    channels: 3,
    items: 2,
    width: 50,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t, delta) {
        var curveX = x*x - 1
        var curveZ = x*x*x - x

        var h = Math.sqrt(curveX * curveX + curveZ * curveZ)
        var xCircle = curveX/h
        var zCircle = curveZ/h

        var xAdj = adjX(x)

        emit(-xCircle, xAdj * 2 * Math.PI, -zCircle)
        emit(xCircle, xAdj * 2 * Math.PI, zCircle)
    }
}).vector({ 
    id: 'blowupGridVector',
    width: 5,
    color: 'black',
    visible: false,
})

var projectiveLine = view.interval({
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

var projectiveIntersections = view.array({
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

var groundCurve = view.interval({
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

var blownUpCurve = view.interval({
    id: 'blownUpCurve',
    channels: 3,
    items: 2,
    width: 256,
    live: false,
    range: defaultRange,
    expr: function(emit, x, i, t) {
        var curveX = x*x - 1
        var curveZ = x*x*x - x

        var xAdj = adjX(x)

        emit(curveX, xAdj * 2 * Math.PI, curveZ)
    }
}).line({
    id: 'blownUpCurveLine',
    width: 30,
    color: 'orange',
})


var blownUpCurveGuidelines =  view.interval({
    id: 'blownUpCurveGuidelines',
    channels: 3,
    items: 2,
    width: 5,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t) {
        var curveX = x*x - 1
        var curveZ = x*x*x - x

        var xAdj = adjX(x)

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

var curveRange = [-1.2, 1.2]
var gridRange = [-1.3, 1.5]

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
