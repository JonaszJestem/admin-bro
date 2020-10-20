"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _action = require("./action");

Object.keys(_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _action[key];
    }
  });
});

var _property = require("./property");

Object.keys(_property).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _property[key];
    }
  });
});

var _resource = require("./resource");

Object.keys(_resource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resource[key];
    }
  });
});