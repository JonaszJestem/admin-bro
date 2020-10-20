"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _buildFeature = require("./build-feature");

Object.keys(_buildFeature).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _buildFeature[key];
    }
  });
});