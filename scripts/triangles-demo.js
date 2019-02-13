var mathbox = mathBox({
  element: document.querySelector("#triangles-demo"),
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
    position: [2, 0.4, 1.5]
})
mathbox.set('focus', 1);

let size = 2;
let xmin = ymin = zmin = -size;
let xmax = ymax = zmax = size;

var view = mathbox.cartesian({
  range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
  scale: [1, 1, 1],
});

let colors = {
    x: new THREE.Color(0xFF4136),
    y: new THREE.Color(0x2ECC40),
    z: new THREE.Color(0x0074D9),
};

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


let data = []
let maxlen = 1000;

view.interval({
    channels: 3,
    items: 3,
    width: maxlen,
    expr: function(emit, x, i, t, delta) {
        let xpos = Math.cos(i/100);
        let ypos = Math.sin(i/100);
        if (i < data.length) {
            let datum = data[i]
            emit(2*xpos + datum[0][0]*xpos, datum[0][1], 2*ypos + datum[0][0]*ypos)
            emit(2*xpos + datum[1][0]*xpos, datum[1][1], 2*ypos + datum[1][0]*ypos)
            emit(2*xpos + datum[2][0]*xpos, datum[2][1], 2*ypos + datum[2][0]*ypos)
        }
    },
}).face({
    opacity: 0.6,
    width: 5,
    color: 'orange',
    fill: false,
    line: true,
})


view.interval({
    channels: 3,
    items: 1,
    width: maxlen,
    expr: function(emit, x, i, t, delta) {
        let xpos = Math.cos(i/100);
        let ypos = Math.sin(i/100);
        if (i < data.length) {
            let datum = data[i]
            emit(2*xpos + datum[0][0]*xpos, datum[0][1], 2*ypos + datum[0][0]*ypos)
        }
    },
}).line({
    width: 15,
    color: 'blue',
})

view.interval({
    channels: 3,
    items: 1,
    width: maxlen,
    expr: function(emit, x, i, t, delta) {
        let xpos = Math.cos(i/100);
        let ypos = Math.sin(i/100);
        if (i < data.length) {
            let datum = data[i]
            emit(2*xpos + datum[1][0]*xpos, datum[1][1], 2*ypos + datum[1][0]*ypos)
        }
    },
}).line({
    width: 15,
    color: colors.y,
})

view.interval({
    channels: 3,
    items: 1,
    width: maxlen,
    expr: function(emit, x, i, t, delta) {
        let xpos = Math.cos(i/100);
        let ypos = Math.sin(i/100);
        if (i < data.length) {
            let datum = data[i]
            emit(2*xpos + datum[2][0]*xpos, datum[2][1], 2*ypos + datum[2][0]*ypos)
        }
    },
}).line({
    width: 15,
    color: "purple",
})



// jsxgraph

JXG.Options.layer['polygon'] = 8;
const board = JXG.JSXGraph.initBoard('jxgcontrols', {
    boundingbox: [-xmax, ymax, xmax, -ymax],
    axis: true,
    pan: false,
});

let p1 = board.create('point', [1, 0])
let p2 = board.create('point', [0, 1])
let p3 = board.create('point', [-1, -1])

let s1 = board.create('segment', [p1, p2])
let s2 = board.create('segment', [p2, p3])
let s3 = board.create('segment', [p3, p1])

board.on('update', function() {
    if (data.length > maxlen) {
        data = [];
    }

    data.push([[p1.X(), p1.Y()], [p2.X(), p2.Y()], [p3.X(), p3.Y()]])
})
