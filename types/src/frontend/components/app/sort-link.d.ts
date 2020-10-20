import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';
import { PropertyJSON } from '../../interfaces';
export declare type SortLinkProps = {
    property: PropertyJSON;
    direction?: 'asc' | 'desc';
    sortBy?: string;
};
declare class SortLink extends React.PureComponent<SortLinkProps & RouteComponentProps> {
    constructor(props: any);
    isActive(): boolean;
    render(): ReactNode;
}
declare const _default;
export default _default;
