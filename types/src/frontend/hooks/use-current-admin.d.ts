import { CurrentAdmin } from '../../current-admin.interface';
/**
 * @memberof useCurrentAdmin
 * @alias UseCurrentAdminResponse
 */
export declare type UseCurrentAdminResponse = [CurrentAdmin | null, (currentAdmin: CurrentAdmin | null) => CurrentAdmin | {}];
/**
 * Hook which allows you to get and set currentAdmin
 *
 * ```usage
 * import { useCurrentAdmin } from 'admin-bro'
 *
 * const myComponent = () => {
 *   const [currentAdmin, setCurrentAdmin] = useCurrentAdmin()
 *   // ...
 * }
 * ```
 *
 * @class
 * @subcategory Hooks
 * @bundle
 * @hideconstructor
 */
export declare const useCurrentAdmin: () => UseCurrentAdminResponse;
export default useCurrentAdmin;
