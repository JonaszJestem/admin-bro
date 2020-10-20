import { FlattenParams } from '../flat';
/**
 *
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} property
 * @param {any} [value]       if not give function will only try to remove old keys
 */
declare const set: (params: FlattenParams | undefined, property: string, value?: any) => FlattenParams;
export { set };
