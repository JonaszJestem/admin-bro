"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = void 0;

var _flat = require("flat");

var _constants = require("./constants");

var _propertyKeyRegex = require("./property-key-regex");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} property
 * @param {any} [value]       if not give function will only try to remove old keys
 */
const set = (params = {}, property, value) => {
  const regex = (0, _propertyKeyRegex.propertyKeyRegex)(property); // remove all existing keys

  const paramsCopy = Object.keys(params).filter(key => !key.match(regex)).reduce((memo, key) => _objectSpread(_objectSpread({}, memo), {}, {
    [key]: params[key]
  }), {});

  if (typeof value !== 'undefined') {
    if (typeof value === 'object' && !(value instanceof File) && value !== null) {
      const flattened = (0, _flat.flatten)(value);

      if (Object.keys(flattened).length) {
        Object.keys(flattened).forEach(key => {
          paramsCopy[`${property}${_constants.DELIMITER}${key}`] = flattened[key];
        });
      } else if (Array.isArray(value)) {
        paramsCopy[property] = [];
      } else {
        paramsCopy[property] = {};
      }
    } else {
      paramsCopy[property] = value;
    }
  }

  return paramsCopy;
};

exports.set = set;