var mathbox = mathBox({
  element: document.querySelector("#umbrella"),
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
    position: [-1, -1, -3]
})
mathbox.set('focus', 1);

var colors = {
    x: new THREE.Color(0xFF4136),
    y: new THREE.Color(0x2ECC40),
    z: new THREE.Color(0x0074D9),
};

var size = 2;
var xmin = ymin = zmin = -size;
var xmax = ymax = zmax = size;

var view = mathbox.cartesian({
  range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
  scale: [1, 1, 1],
});

var sampler = view.area({
  id: 'sampler',
  width: 64,
  height: 64,
  axes: [1, 3],
  expr: function (emit, x, y, i, j, time) {
    emit(x*y, x, y*y - 2)
  },
  live: false,
  items: 1,
  channels: 3,
});

var color=    view.volume({
      id: "color",
      width: 64,
      height: 64,
      items: 1,
      channels: 4,
      expr: function(emit, x, y, z){
          var color = y*y/4
          var color2 = (x*y + 4)/8
          emit(color2, color, 0, 0.75);
    },
    live: false
    })

    /*
var xlim = 4, ylim = 2, zlim = 2;

var faces = view.voxel({
    id: 'faces',
    items: 17,
    channels: 3,
    data: [[-xlim, ylim, zlim], [xlim, ylim, zlim],
           [xlim, -ylim, zlim], [-xlim, -ylim, zlim], [-xlim, ylim, zlim],
           [-xlim, ylim, -zlim], [-xlim, -ylim, -zlim], [-xlim, -ylim, zlim],
           [-xlim, -ylim, -zlim], [xlim, -ylim, -zlim],
            [xlim, -ylim, zlim], [xlim, -ylim, -zlim],
            [xlim, ylim, -zlim], [xlim, ylim, zlim], [xlim, ylim, -zlim],
            [-xlim, ylim, -zlim], [-xlim, -ylim, -zlim], 
    ],
    live: false
})

view.face({
    points: faces,
    shaded: false,
    line: true,
    fill: false,
    width: 5
})
    */

view.surface({
  shaded: true,
  lineX: true,
  lineY: true,
  points: sampler,
  colors: color,
  color: 0xFFFFFF,
  width: 5,
  fill: true
});


