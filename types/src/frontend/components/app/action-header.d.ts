import React from 'react';
import { ActionJSON, RecordJSON, ResourceJSON } from '../../interfaces';
import { ActionResponse } from '../../../backend/actions/action.interface';
/**
 * @memberof ActionHeader
 * @alias ActionHeaderProps
 */
export declare type ActionHeaderProps = {
    /** Resource for the action */
    resource: ResourceJSON;
    /** Optional record - for _record_ actions */
    record?: RecordJSON;
    /** If given, action header will render Filter button */
    toggleFilter?: () => any;
    /**
     * It indicates if action without a component was performed.
     */
    actionPerformed?: (action: ActionResponse) => any;
    /** An action objet */
    action: ActionJSON;
    /** Optional tag which will be rendered as a {@link Badge} */
    tag?: string;
    /** If set, component wont render actions */
    omitActions?: boolean;
};
/**
 * Header of an action. It renders Action name with buttons for all the actions.
 *
 * ### Usage
 *
 * ```
 * import { ActionHeader } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Application
 */
export declare const ActionHeader: React.FC<ActionHeaderProps>;
export default ActionHeader;
