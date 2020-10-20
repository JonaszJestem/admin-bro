"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _optionsParser = require("./options-parser");

Object.keys(_optionsParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _optionsParser[key];
    }
  });
});