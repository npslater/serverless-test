var chai = require("chai");
var expect = chai.expect;
var handler = require("../handler");

describe('handler', function() {
  it('should succeed', function() {
      handler.handler(null, null);
  });

});
