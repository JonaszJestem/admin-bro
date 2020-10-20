import { ActionJSON } from '../../interfaces';
import { DifferentActionParams } from './use-action.types';
export declare const isResourceAction: (params: DifferentActionParams, action: ActionJSON) => params is import("../../../backend/utils/view-helpers/view-helpers").ActionParams;
