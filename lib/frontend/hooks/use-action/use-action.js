"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAction = useAction;

var _react = require("react");

var _reactRouter = require("react-router");

var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers/view-helpers"));

var _appendForceRefresh = require("../../components/actions/utils/append-force-refresh");

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _useNotice = _interopRequireDefault(require("../use-notice"));

var _isResourceAction = require("./is-resource-action");

var _isBulkAction = require("./is-bulk-action");

var _isRecordAction = require("./is-record-action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const h = new _viewHelpers.default();
/**
 * @load ./use-action.doc.md
 * @subcategory Hooks
 *
 * @param {ActionJSON}   action      action object
 * @param {ActionParams} params
 * @param {ActionCallCallback} onActionCall - callback triggered when action is performed
 * @return {UseActionResult}
 * @new In version 3.3
 * @class
 * @hideconstructor
 */

function useAction(action, params, onActionCall) {
  const location = (0, _reactRouter.useLocation)();
  const history = (0, _reactRouter.useHistory)();
  const addNotice = (0, _useNotice.default)();
  const {
    name: actionName
  } = action;
  const {
    resourceId,
    recordId,
    recordIds
  } = params;
  const setHref = (0, _react.useCallback)(() => {
    if ((0, _isRecordAction.isRecordAction)(params, action)) {
      return h.recordActionUrl(_objectSpread(_objectSpread({}, params), {}, {
        actionName,
        search: location.search
      }));
    }

    if ((0, _isBulkAction.isBulkAction)(params, action)) {
      return h.bulkActionUrl(_objectSpread(_objectSpread({}, params), {}, {
        actionName,
        search: location.search
      }));
    }

    if ((0, _isResourceAction.isResourceAction)(params, action)) {
      return h.resourceActionUrl({
        resourceId,
        actionName,
        search: location.search
      });
    }

    throw new Error('"actionType" should be either record, resource or bulk');
  }, [resourceId, location, action]);
  const href = setHref();

  const callApi = () => {
    const api = new _apiClient.default();
    let promise;

    switch (action.actionType) {
      case 'record':
        if (!recordId) {
          throw new Error('You have to specify "recordId" for record action');
        } // TODO: change type from any - in general handle types for Action


        promise = api.recordAction({
          resourceId,
          actionName: action.name,
          recordId
        });
        break;

      case 'resource':
        promise = api.resourceAction({
          resourceId,
          actionName: action.name
        });
        break;

      case 'bulk':
        if (!recordIds) {
          throw new Error('You have to specify "recordIds" for bulk action');
        }

        promise = api.bulkAction({
          resourceId,
          actionName: action.name,
          recordIds
        });
        break;

      default:
        throw new Error('"actionType" should be either record, resource or bulk');
    }

    promise.then(response => {
      const {
        data
      } = response;

      if (data.notice) {
        addNotice(data.notice);
      }

      if (data.redirectUrl && location.pathname !== data.redirectUrl) {
        const appended = (0, _appendForceRefresh.appendForceRefresh)(data.redirectUrl);
        history.push(appended);
      }

      if (onActionCall) {
        onActionCall(data);
      }
    }).catch(error => {
      throw error;
    });
    return promise;
  };

  const handleClick = event => {
    event.preventDefault();
    event.stopPropagation();

    if (action.guard && !confirm(action.guard)) {
      return;
    }

    if (typeof action.component !== 'undefined' && action.component === false) {
      callApi();
    } else {
      history.push(href);
    }
  };

  return {
    href,
    callApi,
    handleClick
  };
}