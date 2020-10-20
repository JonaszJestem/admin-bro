"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flatModule = require("./flat-module");

Object.keys(_flatModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flatModule[key];
    }
  });
});

var _flat = require("./flat.types");

Object.keys(_flat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flat[key];
    }
  });
});