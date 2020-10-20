"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _translateFunctions = require("./translate-functions.factory");

Object.keys(_translateFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _translateFunctions[key];
    }
  });
});

var _flat = require("./flat");

Object.keys(_flat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flat[key];
    }
  });
});