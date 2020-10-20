"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.populator = void 0;

var _populateProperty = require("./populate-property");

/**
 * Populates all records references. If the record has a reference to let say `user_id`
 * it will fill record.populated['user_id'] with the corresponding User record.
 *
 * It mutates the `records` param
 *
 * @param {Array<BaseRecord>} records
 * @new In version 3.3
 */
const populator = async records => {
  if (!records || !records.length) {
    return records;
  }

  const resourceDecorator = records[0].resource.decorate();
  const allProperties = Object.values(resourceDecorator.properties);
  const references = allProperties.filter(p => !!p.reference());
  await Promise.all(references.map(async propertyDecorator => {
    await (0, _populateProperty.populateProperty)(records, propertyDecorator);
  }));
  return records;
};

exports.populator = populator;
var _default = populator;
exports.default = _default;