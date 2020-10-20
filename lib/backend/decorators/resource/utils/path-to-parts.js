"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathToParts = void 0;

/**
 * Changes path with flatten notation, with dots (.) inside, to array of all possible
 * keys which can have a property.
 *
 * - changes: `nested.nested2.normalInner`
 * - to `["nested", "nested.nested2", "nested.nested2.normalInner"]`
 *
 * Also it takes care of the arrays, which are separated by numbers (indexes).
 * - changes: `nested.0.normalInner.1`
 * - to: `nested.normalInner`
 *
 * Everything because when we look for a property of a given path it can be inside a
 * mixed property. So first, we have to find top level mixed property, and then,
 * step by step, find inside each of them.
 *
 * @private
 *
 * @param   {string}  propertyPath
 *
 * @return  {PathParts}
 */
const pathToParts = propertyPath => // eslint-disable-next-line no-restricted-globals
propertyPath.split('.').filter(part => isNaN(+part)).reduce((memo, part) => {
  if (memo.length) {
    return [...memo, [memo[memo.length - 1], part].join('.')];
  }

  return [part];
}, []);

exports.pathToParts = pathToParts;