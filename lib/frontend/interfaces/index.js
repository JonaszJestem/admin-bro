"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionJson = require("./action-json.interface");

Object.keys(_actionJson).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _actionJson[key];
    }
  });
});

var _pageJson = require("./page-json.interface");

Object.keys(_pageJson).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pageJson[key];
    }
  });
});

var _propertyJson = require("./property-json.interface");

Object.keys(_propertyJson).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _propertyJson[key];
    }
  });
});

var _recordJson = require("./record-json.interface");

Object.keys(_recordJson).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _recordJson[key];
    }
  });
});

var _resourceJson = require("./resource-json.interface");

Object.keys(_resourceJson).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resourceJson[key];
    }
  });
});