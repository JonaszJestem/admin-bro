"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _flat = require("../../../utils/flat");

var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

/**
 * Representation of an particular ORM/ODM Record in given Resource in AdminBro
 *
 * @category Base
 */
class BaseRecord {
  /**
   * Resource to which record belongs
   */

  /**
   * Actual record data stored as a flatten object
   */

  /**
   * Object containing all validation errors: this.errors[path] = 'errorMessage'
   */

  /**
   * Object containing all populated relations.
   */

  /**
   * @param  {ParamsType}   params         all resource data. I.e. field values
   * @param  {BaseResource} resource       resource to which given record belongs
   */
  constructor(params, resource) {
    this.resource = resource;
    this.params = params ? _flat.flat.flatten(params) : {};
    this.errors = {};
    this.populated = {};
  }
  /**
   * Returns value for given field.
   * @param  {string} path      path (name) for given field: i.e. 'email' or 'authentication.email'
   *                            if email is nested within the authentication object in the data
   *                            store
   * @return {any}              value for given field
   */


  param(path) {
    return _flat.flat.get(this.params, path);
  }
  /**
   * Returns object containing all params keys starting with prefix
   *
   * @param   {string}  prefix
   *
   * @return  {object | undefined}
   */


  namespaceParams(prefix) {
    return _flat.flat.filterParams(this.params, prefix);
  }
  /**
   * Updates given Record in the data store. Practically it invokes
   * {@link BaseResource.update} method.
   *
   * When validation error occurs it stores that to {@link BaseResource.errors}
   *
   * @param  {object} params all field with values which has to be updated
   * @return {Promise<BaseRecord>}        given record (this)
   */


  async update(params) {
    try {
      this.storeParams(params);
      this.params = await this.resource.update(this.id(), params);
    } catch (e) {
      if (e instanceof _validationError.default) {
        this.errors = e.propertyErrors;
        return this;
      }

      throw e;
    }

    this.errors = {};
    return this;
  }
  /**
   * Saves the record in the database. When record already exists - it updates, otherwise
   * it creates new one.
   *
   * Practically it invokes
   * {@link BaseResource#create} or {@link BaseResource#update} methods.
   *
   * When validation error occurs it stores that to {@link BaseResource#errors}
   *
   * @return {Promise<BaseRecord>}        given record (this)
   */


  async save() {
    try {
      if (this.id()) {
        this.params = await this.resource.update(this.id(), this.params);
      } else {
        this.params = await this.resource.create(this.params);
      }
    } catch (e) {
      if (e instanceof _validationError.default) {
        this.errors = e.propertyErrors;
        return this;
      }

      throw e;
    }

    this.errors = {};
    return this;
  }
  /**
   * Returns uniq id of the Record.
   * @return {string | number} id of the Record
   */


  id() {
    const idProperty = this.resource.properties().find(p => p.isId());

    if (!idProperty) {
      throw new Error(`Resource: "${this.resource.id()}" does not have an id property`);
    }

    return this.param(idProperty.name());
  }
  /**
   * Returns title of the record. Usually title is an value for fields like: email, topic,
   * title etc.
   *
   * Title will be shown in the breadcrumbs for example.
   *
   * @return {string} title of the record
   */


  title() {
    const nameProperty = this.resource.properties().find(p => p.isTitle());
    return nameProperty ? this.param(nameProperty.name()) : this.id();
  }
  /**
   * Return state of validation for given record
   * @return {boolean} if record is valid or not.
   */


  isValid() {
    return Object.keys(this.errors).length === 0;
  }
  /**
   * Returns error message for given property path (name)
   * @param  {string} path        (name) of property which we want to check if is valid
   * @return {RecordError | null}      validation message of null
   */


  error(path) {
    return this.errors[path];
  }
  /**
   * Populate record relations
   *
   * @param   {string}  propertyPath           name of the property which should be populated
   * @param   {BaseRecord | null}  [record]    record to which property relates. If record is null
   *                                           or undefined - function clears the previous value
   */


  populate(propertyPath, record) {
    if (record === null || typeof record === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _this$populated = this.populated,
            {
        [propertyPath]: oldValue
      } = _this$populated,
            rest = _objectWithoutProperties(_this$populated, [propertyPath].map(_toPropertyKey));

      this.populated = rest;
    } else {
      this.populated[propertyPath] = record;
    }
  }
  /**
   * Returns JSON representation of an record
   * @param {CurrentAdmin} [currentAdmin]
   * @return  {RecordJSON}
   */


  toJSON(currentAdmin) {
    const populated = Object.keys(this.populated).reduce((m, key) => _objectSpread(_objectSpread({}, m), {}, {
      [key]: this.populated[key].toJSON(currentAdmin)
    }), {});
    return {
      params: this.params,
      populated,
      errors: this.errors,
      id: this.id(),
      title: this.resource.decorate().titleOf(this),
      recordActions: this.resource.decorate().recordActions(this, currentAdmin).map(recordAction => recordAction.toJSON(currentAdmin)),
      bulkActions: this.resource.decorate().bulkActions(this, currentAdmin).map(recordAction => recordAction.toJSON(currentAdmin))
    };
  }
  /**
   * Stores incoming payloadData in record params
   *
   * @param {object} [payloadData]
   */


  storeParams(payloadData) {
    this.params = _lodash.default.merge(this.params, payloadData ? _flat.flat.flatten(payloadData) : {});
  }

}

var _default = BaseRecord;
exports.default = _default;