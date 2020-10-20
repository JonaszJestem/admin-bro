import { AxiosResponse } from 'axios';
import { RecordJSON } from '../interfaces';
import { ListActionResponse } from '../../backend/actions/list/list-action';
export declare type UseRecordsResult = {
    records: Array<RecordJSON>;
    loading: boolean;
    page: number;
    perPage: number;
    total: number;
    direction: 'asc' | 'desc';
    sortBy?: string;
    fetchData: () => Promise<AxiosResponse<ListActionResponse>>;
};
export declare const useRecords: (resourceId: string) => UseRecordsResult;
export default useRecords;
