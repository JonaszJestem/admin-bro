"use strict";

var _chai = require("chai");

var _set = require("./set");

describe('module:flat.set', () => {
  let params;
  let newParams;
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
      'meta.fun': '8/10'
    };
  });
  it('sets regular property when it is default type', () => {
    const age = 37;
    (0, _chai.expect)((0, _set.set)(params, 'age', age)).to.have.property('age', 37);
  });
  context('passing basic types', () => {
    const newPropertyName = 'newProperty';
    it('does not change the record when regular file is set', function () {
      const file = new File([], 'amazing.me');
      newParams = (0, _set.set)(params, newPropertyName, file);
      (0, _chai.expect)(newParams[newPropertyName]).to.equal(file);
    });
    it('sets null', () => {
      (0, _chai.expect)((0, _set.set)(params, newPropertyName, null)).to.have.property(newPropertyName, null);
    });
    it('sets empty object', () => {
      (0, _chai.expect)((0, _set.set)(params, newPropertyName, {})).to.deep.include({
        [newPropertyName]: {}
      });
    });
    it('sets empty array', () => {
      (0, _chai.expect)((0, _set.set)(params, newPropertyName, [])).to.deep.include({
        [newPropertyName]: []
      });
    });
  });
  context('passing array', () => {
    const interest = ['js', 'ts'];
    beforeEach(() => {
      newParams = (0, _set.set)(params, 'interest.OfMe', interest);
    });
    it('replaces sets values for all new arrays items', () => {
      (0, _chai.expect)(newParams).to.include({
        'interest.OfMe.0': 'js',
        'interest.OfMe.1': 'ts'
      });
    });
    it('removes old values', () => {
      (0, _chai.expect)(newParams).not.to.have.property('interest.OfMe.2');
    });
    it('leaves other values which name starts the same', () => {
      (0, _chai.expect)(newParams).to.have.property('interests', params.interests);
    });
  });
  context('value is undefined', () => {
    const property = 'meta';
    beforeEach(() => {
      newParams = (0, _set.set)(params, property);
    });
    it('removes all existing properties', () => {
      (0, _chai.expect)(newParams).not.to.have.keys('meta.position', 'meta.workingHours', 'meta.duties', 'meta.fun');
    });
    it('does not set any new key', () => {
      (0, _chai.expect)(Object.keys(newParams).length).to.eq(Object.keys(params).length - 4);
    });
  });
  context('mixed type was inside and should be updated', () => {
    const meta = {
      position: 'adminBroCEO',
      workingHours: '6:00-21:00'
    };
    beforeEach(() => {
      newParams = (0, _set.set)(params, 'meta', meta);
    });
    it('clears the previous value for nested string', () => {
      (0, _chai.expect)(newParams).not.to.have.keys('meta.duties', 'meta.fun');
    });
    it('sets the new value for nested string', () => {
      (0, _chai.expect)(newParams).to.include({
        'meta.position': meta.position,
        'meta.workingHours': meta.workingHours
      });
    });
  });
});