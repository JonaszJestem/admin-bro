/**
 * Available fo flatten value
 *
 * @memberof module:flat
 */
export declare type FlattenValue = 'string' | 'boolean' | 'number' | null | [] | {} | File;
/**
 * Type of flatten params
 *
 * @memberof module:flat
 */
export declare type FlattenParams = {
    [key: string]: FlattenValue;
};
