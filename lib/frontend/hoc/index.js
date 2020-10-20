"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _allowOverride = require("./allow-override");

Object.keys(_allowOverride).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _allowOverride[key];
    }
  });
});

var _withNotice = require("./with-notice");

Object.keys(_withNotice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _withNotice[key];
    }
  });
});