var mathbox = mathBox({
  element: document.querySelector("#cylinder"),
  plugins: ['core', 'controls', 'cursor', 'mathbox'],
  controls: {
    // Orbit controls, i.e. Euler angles, with gimbal lock
    klass: THREE.OrbitControls,

    // Trackball controls, i.e. Free quaternion rotation
    //klass: THREE.TrackballControls,
  },
  renderer: { parameters: { alpha: true } },
});
if (mathbox.fallback) throw "WebGL not supported"

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);
three.renderer.setClearAlpha(0);

var camera = mathbox.camera({
    proxy: true,
    position: [3, 0.4, 1.5]
})
mathbox.set('focus', 1);

var size = 2;
var xmin = ymin = zmin = -size;
var xmax = ymax = zmax = size;

var view = mathbox.cartesian({
  range: [[xmin, xmax], [ymin, ymax], [zmin, zmax]],
  scale: [1, 1, 1],
});

var r = 1;
var angle = Math.PI/3;

var cylinderData = view.area({
  id: 'cylinder',
  width: 64,
  height: 64,
  rangeX: [0, 2*Math.PI],
  rangeY: [-3, 3],
  axes: [1, 3],
  expr: function (emit, x, y, i, j, time) {
    emit(r*Math.cos(x), y, r*Math.sin(x))
  },
  live: false,
  items: 1,
  channels: 3,
  fps: 1
})

var intersectingPlane = view.area({
  id: 'plane',
  width: 64,
  height: 64,
  rangeX: [-r, r],
  rangeY: [-r, r],
  axes: [1, 3],
  expr: function (emit, x, y, i, j, time) {
      emit(x, -x*Math.tan(angle), y);
  },
  live: false,
  items: 1,
  channels: 3,
  fps: 1
})

/*
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
*/

var minor = r
var c = r*Math.tan(angle)
var major = r/Math.cos(angle)
var cx = c*Math.cos(angle)
var cy = c*Math.sin(angle)
var ellipseY = major*Math.sin(angle);
var sy = Math.sqrt(r*r + c*c)
var slowdown = 3;

view.interval({
    channels: 3,
    items: 3,
    width: 1,
    range: [0, Math.PI],
    expr: function(emit, x, i, t, delta) {
        t = t / slowdown;

        var xpos = r*Math.cos(x + t)
        var zpos = minor*Math.sin(x + t)
        var ypos = ellipseY * Math.cos(x + t)

        emit(-xpos, sy, zpos)
        emit(-xpos, ypos, zpos)
        emit(-cx, cy, 0)
    }
}).vector({
    width: 10,
    color: 'red'
}).point({
    size: 30,
    color: 'green',
})

view.interval({
    channels: 3,
    items: 3,
    width: 1,
    range: [0, Math.PI],
    expr: function(emit, x, i, t, delta) {
        t = Math.PI - t/slowdown;
        var xpos = r*Math.cos(x + t)
        var zpos = minor*Math.sin(x + t)
        var ypos = ellipseY * Math.cos(x + t)

        emit(xpos, -sy, zpos)
        emit(xpos, -ypos, zpos)
        emit(cx, -cy, 0)
    }
}).vector({
    width: 10,
    color: 'blue'
}).point({
    size: 30,
    color: 'green',
})

view.area({
  id: 'sphere',
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
}).transform({
    position: [0, sy, 0]
})
.surface({
  lineX: false,
  lineY: false,
  color: "purple",
  //colors: color,
  width: 5,
  fill: true,
}).end().transform({
    position: [0, -sy, 0]
}).surface({
  lineX: false,
  lineY: false,
  color: "purple",
  //colors: color,
  width: 5,
  fill: true,
}).end()
;
view.surface({
  points: intersectingPlane,
  //colors: color,
  fill: true,
  opacity: 0.8,
});

view.surface({
  lineX: false,
  lineY: false,
  points: cylinderData,
  color: "#89cff0",
  //colors: color,
  width: 5,
  fill: true,
  opacity: 0.3,
});
