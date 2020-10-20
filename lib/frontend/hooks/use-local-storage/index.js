"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useLocalStorage = require("./use-local-storage");

Object.keys(_useLocalStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useLocalStorage[key];
    }
  });
});

var _useLocalStorageResult = require("./use-local-storage-result.type");

Object.keys(_useLocalStorageResult).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useLocalStorageResult[key];
    }
  });
});