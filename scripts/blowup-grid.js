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

var camera = mathbox.camera({
    proxy: true,
}).play({
  pace: 5,
  loop: false,
  script: [
      {props: {position: [1, 2, 1], lookAt: [0, -2, 0]}},
      {props: {position: [1.5, 1, 1.5], lookAt: [0, 0, 0]}},
  ]
})

mathbox.set('focus', 1);

let size = 2;
let xmin = ymin = zmin = -size;
let xmax = ymax = zmax = size;

var view = mathbox.cartesian({
  range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
  scale: [1, 1, 1],
});

view.play({
  pace: 5,
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

let origin = [0, -2, 0, 0]
let defaultRange = [origin[1], origin[1]]
let partitions = 17; // + 1

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
    stroke: 'dotted',
})

let blowupBoundary1 = view.interval({
    id: 'blowupBoundary1',
    channels: 3,
    items: 1,
    width: 64,
    range: defaultRange,
    live: true,
    expr: function(emit, x, i, t, delta) {
        emit(Math.cos(x), x, Math.sin(x))
    }
}).line({ width: 10,
    color: 'black',
    stroke: 'dotted',
})


let blowupBoundary2 = view.interval({
    id: 'blowupBoundary2',
    channels: 3,
    items: 1,
    width: 64,
    range: defaultRange,
    live: true,
    expr: function(emit, x, i, t, delta) {
        emit(-Math.cos(x), x, -Math.sin(x))
    }
}).line({
    width: 10,
    color: 'black',
    stroke: 'dotted',
})

let affineGrid = view.interval({
    channels: 3,
    items: 2,
    width: partitions,
    live: false,
    range: [-Math.PI, Math.PI],
    expr: function(emit, x, i, t, delta) {
        emit(-Math.cos(x), origin[1], -Math.sin(x))
        emit(Math.cos(x), origin[1], Math.sin(x))
    }
}).vector({
    width: 5,
    color: 'black',
})

let blowupGrid = view.interval({
    id: 'blowupGrid',
    channels: 3,
    items: 2,
    width: partitions,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t, delta) {
        emit(Math.cos(x), x, Math.sin(x))
        emit(-Math.cos(x), x, -Math.sin(x))
    }
}).vector({ 
    width: 5,
    color: 'black',
}).play({
    delay: blowupDelay - 0.3,
    script: [
      {props: {visible: false}},
      {props: {visible: true}},
    ],
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

let projectiveIntersections = view.interval({
    id: 'projectiveIntersections',
    channels: 3,
    items: 2,
    width: partitions,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t, delta) {
        emit(0, x, 0)
    }
}).point({
    size: 30,
    color: 'blue'
}).play({
    delay: blowupDelay - 0.3,
    script: [
      {props: {visible: false}},
      {props: {visible: true}},
    ],
})

let guidelines = view.interval({
    id: 'guidelines',
    channels: 3,
    items: 2,
    width: 5,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t, delta) {
        if (i < 4) {
            emit(Math.cos(x), origin[1], Math.sin(x))
            emit(Math.cos(x), x, Math.sin(x))
        }
    }
}).vector({ width: 3,
    color: 'black',
})

let guidelinePoints = view.interval({
    id: 'guidelinePoints',
    channels: 3,
    items: 2,
    width: 5,
    live: true,
    range: defaultRange,
    expr: function(emit, x, i, t, delta) {
        emit(Math.cos(x), x, Math.sin(x))
    }
}).point({ 
    size: 30,
    color: 'purple',
    visible: false,
}).play({
    delay: blowupDelay - 0.3,
    script: [
        {props: {visible: false}},
        {props: {visible: true}},
    ]
})

//animations

function blowup(target) {
    view.play({ 
      target: target,
      delay: blowupDelay,
      script: [
        {props: {range: [origin[1], origin[1]]}},
        {props: {range: [0, Math.PI]}},
      ],
    })
}

blowup('#blowupBoundary1')
blowup('#blowupBoundary2')
blowup('#blowupGrid')
blowup('#projectiveIntersections')
blowup('#guidelines')
blowup('#guidelinePoints')

view.play({ 
  target: '#projectiveLine',
  delay: blowupDelay,
  script: [
    {props: {range: defaultRange}},
    {props: {range: [5, 5]}},
  ],
})
