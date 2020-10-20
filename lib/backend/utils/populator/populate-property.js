"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateProperty = void 0;

var _constants = require("../../../utils/flat/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * It populates one property in given records
 *
 * @param {Array<BaseRecord>} records   array of records to populate
 * @param {PropertyDecorator} property  Decorator for the reference property to populate
 * @new In version 3.3
 */
const populateProperty = async (records, property) => {
  const decoratedResource = property.resource();

  if (!records || !records.length) {
    return records;
  }

  const referencedResource = property.reference();

  if (!referencedResource) {
    throw new Error([`There is no reference resource named: "${property.property.reference}"`, `for property: "${decoratedResource.id()}.properties.${property.path}"`].join('\n'));
  } // I will describe the process for following data:
  // - decoratedResource = 'Comment'
  // - referenceResource = 'User'
  // property.path = 'userId'
  // first, we create externalIdsMap[1] = null where 1 is userId. This make keys unique and assign
  // nulls to each of them


  const externalIdsMap = records.reduce((memo, baseRecord) => {
    const foreignKeyValue = baseRecord.param(property.path); // when foreign key is not filled (like null) - don't add this because
    // BaseResource#findMany (which we will use) might break for nulls

    if (!foreignKeyValue) {
      return memo;
    } // array properties returns arrays so we have to take the all into consideration


    if (property.isArray()) {
      return foreignKeyValue.reduce((arrayMemo, valueInArray) => _objectSpread(_objectSpread({}, arrayMemo), {}, {
        [valueInArray]: null
      }), memo);
    }

    return _objectSpread(_objectSpread({}, memo), {}, {
      [foreignKeyValue]: null
    });
  }, {});
  const uniqueExternalIds = Object.keys(externalIdsMap); // when no record has `userId` filled = return input `records`

  if (!uniqueExternalIds.length) {
    return records;
  } // now find all referenced records: all users


  const referenceRecords = await referencedResource.findMany(uniqueExternalIds); //

  if (!referenceRecords || !referenceRecords.length) {
    return records;
  } // now assign these users to `externalIdsMap` instead of the empty object we had. To speed up
  // assigning them to record#populated we will do in the next step


  referenceRecords.forEach(referenceRecord => {
    // example: externalIds[1] = { ...userRecord } | null (if not found)
    const foreignKeyValue = referenceRecord.id();
    externalIdsMap[foreignKeyValue] = referenceRecord;
  });
  return records.map(record => {
    // we set record.populated['userId'] = externalIdsMap[record.param('userId)]
    // but this can also be an array - we have to check it
    const foreignKeyValue = record.param(property.path);

    if (Array.isArray(foreignKeyValue)) {
      foreignKeyValue.forEach((foreignKeyValueItem, index) => {
        record.populate([property.path, index].join(_constants.DELIMITER), externalIdsMap[foreignKeyValueItem]);
      });
    } else {
      record.populate(property.path, externalIdsMap[foreignKeyValue]);
    }

    return record;
  });
};

exports.populateProperty = populateProperty;