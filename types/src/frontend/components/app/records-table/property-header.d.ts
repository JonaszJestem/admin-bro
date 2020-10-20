import React from 'react';
import { PropertyJSON } from '../../../interfaces';
export declare type PropertyHeaderProps = {
    property: PropertyJSON;
    /**
     * Property which should be treated as main property.
     */
    titleProperty: PropertyJSON;
    /**
     * currently selected direction. Either 'asc' or 'desc'.
     */
    direction?: 'asc' | 'desc';
    /**
     * currently selected field by which list is sorted.
     */
    sortBy?: string;
    display?: string | Array<string>;
};
export declare const PropertyHeader: React.FC<PropertyHeaderProps>;
export default PropertyHeader;
