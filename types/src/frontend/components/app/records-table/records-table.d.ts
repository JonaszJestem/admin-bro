import React from 'react';
import { RecordJSON, ResourceJSON } from '../../../interfaces';
import { ActionResponse } from '../../../../backend/actions/action.interface';
export declare type RecordsTableProps = {
    resource: ResourceJSON;
    records: Array<RecordJSON>;
    actionPerformed?: (response: ActionResponse) => any;
    sortBy?: string;
    direction?: 'asc' | 'desc';
    isLoading?: boolean;
    selectedRecords?: Array<RecordJSON>;
    onSelect?: (record: RecordJSON) => any;
    onSelectAll?: () => any;
};
export declare const RecordsTable: React.FC<RecordsTableProps>;
export default RecordsTable;
