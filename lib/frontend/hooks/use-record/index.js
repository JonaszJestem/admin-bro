"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useRecord = require("./use-record");

Object.keys(_useRecord).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRecord[key];
    }
  });
});

var _useRecordResult = require("./use-record-result.type");

Object.keys(_useRecordResult).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRecordResult[key];
    }
  });
});

var _isEntireRecordGiven = require("./is-entire-record-given");

Object.keys(_isEntireRecordGiven).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isEntireRecordGiven[key];
    }
  });
});

var _mergeRecordResponse = require("./merge-record-response");

Object.keys(_mergeRecordResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeRecordResponse[key];
    }
  });
});

var _recordToFormData = require("./record-to-form-data");

Object.keys(_recordToFormData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _recordToFormData[key];
    }
  });
});

var _updateRecord = require("./update-record");

Object.keys(_updateRecord).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updateRecord[key];
    }
  });
});