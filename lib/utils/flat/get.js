"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var _flat = require("flat");

var _constants = require("./constants");

var _filterParams = require("./filter-params");

var _propertyKeyRegex = require("./property-key-regex");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TEMP_HOLDING_KEY = 'TEMP_HOLDING_KEY';
/**
 *
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} property
 */

const get = (params = {}, property) => {
  if (params[property]) {
    return params[property];
  }

  const regex = (0, _propertyKeyRegex.propertyKeyRegex)(property);
  const filteredParams = (0, _filterParams.filterParams)(params, property);
  const nestedProperties = Object.keys(filteredParams).reduce((memo, key) => _objectSpread(_objectSpread({}, memo), {}, {
    [key.replace(regex, `${TEMP_HOLDING_KEY}${_constants.DELIMITER}`)]: filteredParams[key]
  }), {});

  if (Object.keys(nestedProperties).length) {
    return (0, _flat.unflatten)(nestedProperties)[TEMP_HOLDING_KEY];
  }

  return undefined;
};

exports.get = get;