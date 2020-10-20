"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useCurrentAdmin = void 0;

var _reactRedux = require("react-redux");

var _setCurrentAdmin = require("../store/actions/set-current-admin");

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
const useCurrentAdmin = () => {
  const currentAdmin = (0, _reactRedux.useSelector)(state => state.session);
  const dispatch = (0, _reactRedux.useDispatch)();
  return [currentAdmin, admin => dispatch((0, _setCurrentAdmin.setCurrentAdmin)(admin))];
};

exports.useCurrentAdmin = useCurrentAdmin;
var _default = useCurrentAdmin;
exports.default = _default;