import { PathParts } from './path-parts.type';
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
export declare const pathToParts: (propertyPath: string) => PathParts;
