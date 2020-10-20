"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flat = void 0;

var _flat = require("flat");

var _constants = require("./constants");

var _filterParams = require("./filter-params");

var _set = require("./set");

var _get = require("./get");

/**
 * All the data in records are stored in flatten version.
 *
 * Helpers gathered in this module will help you manage them
 *
 * ### Usage
 *
 * ```javascript
 * // on the frontend (i.e in components)
 * import { flat } from 'admin-bro'
 *
 * // on the backend (i.e. in action hooks)
 * const { flat } = require('admin-bro')
 *
 * flat.set(...)
 * ```
 *
 * @module flat
 * @name flat
 * @new In version 3.3
 */
const flat = {
  /**
   * Raw `flatten` function exported from original `flat` package.
   */
  flatten: _flat.flatten,

  /**
   * Raw `unflatten` function exported from original `flat` package.
   */
  unflatten: _flat.unflatten,
  set: _set.set,
  get: _get.get,
  filterParams: _filterParams.filterParams,
  DELIMITER: _constants.DELIMITER
};
exports.flat = flat;