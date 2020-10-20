import { RecordJSON } from '../../interfaces';
import { UseRecordResult } from './use-record-result.type';
/**
 * @load ./use-record.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @bundle
 * @param {RecordJSON} [initialRecord],
 * @param {string} resourceId
 * @return {UseRecordResult}*
 */
export declare const useRecord: (initialRecord: RecordJSON | undefined, resourceId: string) => UseRecordResult;
export default useRecord;
