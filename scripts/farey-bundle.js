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
/******/ 	return __webpack_require__(__webpack_require__.s = "./farey.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./farey.js":
/*!******************!*\
  !*** ./farey.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ford__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ford */ \"./ford.js\");\n\nvar xmax = 1;\nvar ymax = 1;\nvar fareyBoard = JXG.JSXGraph.initBoard('farey', {\n  boundingbox: [0, 1, 1, 0],\n  axis: true,\n  showClearTraces: false,\n  showCopyright: false,\n  showNavigation: false,\n  showReload: false,\n  showZoom: false\n});\nvar latticeBoard = JXG.JSXGraph.initBoard('lattice', {\n  boundingbox: [-xmax, xmax, ymax, -ymax],\n  axis: true,\n  showClearTraces: false,\n  showCopyright: false,\n  showNavigation: false,\n  showReload: false,\n  showZoom: false\n});\nvar origin = fareyBoard.create('point', [0, 0], {\n  visible: false\n});\nvar data = _ford__WEBPACK_IMPORTED_MODULE_0__[\"default\"].calcFarey(0, 1, 1, 1, 5);\ndata.forEach(function (number) {\n  var r = 1 / (2 * number[1] * number[1]);\n  var p = number[0] / number[1];\n  var pt = fareyBoard.create(\"point\", [p, r], {\n    visible: false\n  });\n  fareyBoard.create(\"circle\", [pt, r], {\n    strokeWidth: 5 / number[1]\n  });\n  fareyBoard.create(\"text\", [p, r, \"\".concat(number[0], \"/\").concat(number[1])], {\n    fontSize: 50 / number[1],\n    anchorX: 'middle',\n    anchorY: 'middle'\n  });\n});\n\n//# sourceURL=webpack:///./farey.js?");

/***/ }),

/***/ "./ford.js":
/*!*****************!*\
  !*** ./ford.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// rationals are represented as lists: p/q <==> [p, q]\nfunction mediant(left, right) {\n  //left, right: rationals\n  return [left[0] + right[0], left[1] + right[1]];\n}\n\nfunction pairwiseMediants(entries) {\n  //entries: list of rationals\n  var response = [];\n\n  for (var i = 0; i < entries.length - 1; i++) {\n    response.push(entries[i]);\n    response.push(mediant(entries[i], entries[i + 1]));\n  }\n\n  response.push(entries[entries.length - 1]);\n  return response;\n}\n\nfunction mediantRecur(entries, depth) {\n  if (depth <= 1) {\n    return pairwiseMediants(entries);\n  }\n\n  return pairwiseMediants(mediantRecur(entries, depth - 1));\n}\n\nfunction calcFarey(ln, ld, rn, rd, depth) {\n  return mediantRecur([[ln, ld], [rn, rd]], depth);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  calcFarey: calcFarey\n});\n\n//# sourceURL=webpack:///./ford.js?");

/***/ })

/******/ });