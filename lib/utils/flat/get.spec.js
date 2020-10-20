"use strict";

var _chai = require("chai");

var _get = require("./get");

describe('module:flat.get', () => {
  let params;
  beforeEach(() => {
    params = {
      name: 'Wojtek',
      surname: 'Krysiak',
      age: 36,
      'interest.OfMe.0': 'javascript',
      'interest.OfMe.1': 'typescript',
      'interest.OfMe.2': 'brainTumor',
      interests: 'Generally everything',
      'meta.position': 'CTO',
      'meta.workingHours': '9:00-17:00',
      'meta.duties': 'everything',
      'meta.fun': '8/10',
      nulled: null,
      emptyArray: [],
      emptyObject: {}
    };
  });
  it('returns regular string', () => {
    (0, _chai.expect)((0, _get.get)(params, 'name')).to.eq(params.name);
  });
  it('returns undefined for non existing property', () => {
    (0, _chai.expect)((0, _get.get)(params, 'nameNotExisting')).to.be.undefined;
  });
  it('returns nested array', () => {
    (0, _chai.expect)((0, _get.get)(params, 'interest.OfMe')).to.deep.equal(['javascript', 'typescript', 'brainTumor']);
  });
  it('returns object with nested array', () => {
    (0, _chai.expect)((0, _get.get)(params, 'interest')).to.deep.equal({
      OfMe: ['javascript', 'typescript', 'brainTumor']
    });
  });
  it('returns undefined when not exact property is given', () => {
    (0, _chai.expect)((0, _get.get)(params, 'interest.Of')).to.be.undefined;
  });
});