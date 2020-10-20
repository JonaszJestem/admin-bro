import { ResourceJSON } from '../../interfaces/resource-json.interface';
/**
 * @load ./use-resource.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @new
 * @bundle
 * @param {string} resourceId    Id of a resource you want to get
 */
export declare const useResource: (resourceId: string) => ResourceJSON | undefined;
