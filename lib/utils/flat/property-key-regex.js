"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyKeyRegex = void 0;

var _constants = require("./constants");

// this is the regex used to find all existing properties starting with a key
const propertyKeyRegex = property => {
  const escapedDelimiter = `\\${_constants.DELIMITER}`;
  return new RegExp(`^${property.replace(_constants.DELIMITER, escapedDelimiter)}($|${escapedDelimiter})`);
};

exports.propertyKeyRegex = propertyKeyRegex;