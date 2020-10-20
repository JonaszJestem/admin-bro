"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateProperties = decorateProperties;

var _adapters = require("../../../adapters");

var _property = require("../../property");

var _getPropertyByKey = require("./get-property-by-key");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Initializes PropertyDecorator for all properties within a resource. When
 * user passes new property in the options - it will be created as well.
 *
 * @returns {Object<string,PropertyDecorator>}
 * @private
 */
function decorateProperties(resource, admin, decorator) {
  const {
    options
  } = decorator; // decorate all existing top-level properties

  const properties = resource.properties().reduce((memo, property) => {
    const decoratedProperty = new _property.PropertyDecorator({
      property,
      admin,
      options: options.properties && options.properties[property.name()],
      resource: decorator
    });
    return _objectSpread(_objectSpread({}, memo), {}, {
      [property.name()]: decoratedProperty
    });
  }, {}); // decorate all properties user gave in options but they don't exist in the resource

  if (options.properties) {
    Object.keys(options.properties).forEach(key => {
      const existingProperty = (0, _getPropertyByKey.getPropertyByKey)(key, properties);

      if (!existingProperty) {
        const property = new _adapters.BaseProperty({
          path: key,
          isSortable: false
        });
        properties[key] = new _property.PropertyDecorator({
          property,
          admin,
          options: options.properties && options.properties[key],
          resource: decorator,
          isVirtual: true
        });
      }
    });
  }

  return properties;
}