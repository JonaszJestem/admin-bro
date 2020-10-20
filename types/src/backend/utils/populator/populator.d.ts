import BaseRecord from '../../adapters/record/base-record';
/**
 * Populates all records references. If the record has a reference to let say `user_id`
 * it will fill record.populated['user_id'] with the corresponding User record.
 *
 * It mutates the `records` param
 *
 * @param {Array<BaseRecord>} records
 * @new In version 3.3
 */
export declare const populator: (records: Array<BaseRecord>) => Promise<Array<BaseRecord>>;
export default populator;
