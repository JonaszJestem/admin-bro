import React from 'react';
import { AxiosResponse } from 'axios';
import { BulkActionParams, ResourceActionParams, RecordActionParams } from '../../../backend/utils/view-helpers/view-helpers';
import { ActionResponse } from '../../../backend/actions/action.interface';
export declare type DifferentActionParams = Omit<RecordActionParams, 'actionName'> | Omit<BulkActionParams, 'actionName'> | Omit<ResourceActionParams, 'actionName'>;
export declare type MergedActionParams = RecordActionParams & BulkActionParams & ResourceActionParams;
export declare type ActionCallCallback = (action: ActionResponse) => any;
export declare type UseActionResultCallApi<K extends ActionResponse> = () => Promise<AxiosResponse<K>>;
/**
 * Result of the {@link useAction}.

 * @memberof useAction
 * @alias UseActionResult
 */
export declare type UseActionResult<K extends ActionResponse> = {
    /** Href to an action */
    href: string;
    /** function which will call the API */
    callApi: UseActionResultCallApi<K>;
    /** ready handleClick handler */
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
};
