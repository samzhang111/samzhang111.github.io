/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var xmin = -50;\nvar xmax = 50;\nvar ymax = 30;\nvar ymin = -10;\nvar pl = planck;\nvar Vec2 = pl.Vec2;\n\nvar getRandomInRange = function getRandomInRange(min, max) {\n  return Math.random() * (max - min) + min;\n};\n\nvar makePoints = function makePoints(world, n) {\n  var points = [];\n\n  for (var i = 0; i < n; i++) {\n    var x = getRandomInRange(xmin, xmax);\n    var y = getRandomInRange(ymin, ymax);\n    console.log({\n      x: x,\n      y: y\n    });\n    var point = world.createBody(Vec2(x, y));\n    point.createFixture(pl.Circle(0.5), {\n      filterGroupIndex: -1,\n      density: 1\n    });\n    points.push(point);\n  }\n\n  return points;\n};\n\nvar makeSprings = function makeSprings(world, points, rod) {\n  var springs = [];\n  points.forEach(function (point) {\n    var bearing = world.createBody({\n      type: 'dynamic',\n      position: Vec2(0, 0)\n    });\n    bearing.createFixture(pl.Circle(0.01));\n    var joint = world.createJoint(pl.WheelJoint({\n      bodyA: rod,\n      bodyB: bearing,\n      localAxisA: Vec2(1, 0),\n      enableMotor: true,\n      motorSpeed: 1,\n      maxMotorTorque: 1\n    }));\n    var vertjoint = world.createJoint(pl.PrismaticJoint({\n      bodyA: point,\n      bodyB: bearing,\n      localAxisA: Vec2(0, 1)\n    }));\n    var vertspring = world.createJoint(pl.DistanceJoint({\n      bodyA: point,\n      bodyB: bearing,\n      localAnchorA: Vec2(0, 0),\n      localAnchorB: Vec2(0, 0),\n      frequencyHz: 2,\n      dampingRatio: 0.9,\n      length: 0\n    }));\n    springs.push([bearing, joint, vertjoint, vertspring]);\n  });\n  return springs;\n};\n\nvar makeRod = function makeRod(world) {\n  var rod = world.createBody({\n    type: 'dynamic',\n    fixedRotation: false\n  });\n  rod.createFixture(pl.Box(xmax * 1.5, 0.1), {\n    friction: 0,\n    density: 1,\n    filterGroupIndex: -1\n  });\n  return rod;\n};\n\ndocument.addEventListener(\"DOMContentLoaded\", function (event) {\n  planck.testbed(function (testbed) {\n    var gravity = Vec2(0, 0);\n    var world = pl.World(gravity);\n    var points = makePoints(world, 5);\n    var rod = makeRod(world);\n    var springs = makeSprings(world, points, rod);\n    return world;\n  });\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });