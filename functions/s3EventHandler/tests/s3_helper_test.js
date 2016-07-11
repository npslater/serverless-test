var chai = require("chai");
var expect = chai.expect;
var S3Helper = require("../lib/s3_helper");
var fs = require("fs");
var AWS = require("aws-sdk");

var config = {};
describe('S3Helper', function() {
  beforeEach(function() {
    config = JSON.parse(fs.readFileSync("../../_meta/variables/s-variables-dev.json"));
    var creds = new AWS.SharedIniFileCredentials({profile: config.profile});
    AWS.config.credentials = creds;
  });

  it('getObject() should return a promise', function() {
    var helper = new S3Helper();
    expect(helper.getObject()).to.be.a("Promise");
  });

  it('getObject() should reject the promise', function() {
    var helper = new S3Helper(new AWS.S3());
    helper.getObject().catch(err => {
      expect(err).to.be.a("String");
    }).then(response => {
      //shouldn't get here
      expect(true).to.equal(false);
    });
  });

  it('getObject() should fufill the promise', function() {
    var helper = new S3Helper(new AWS.S3());
    var params = {
      Bucket: config.tests.bucket,
      Key: config.tests.key
    };
    helper.getObject(params).then(response => {
      expect(response.ContentLength > 0).to.equal(true);
    }).catch(err => {
      //shouldn't get here
      console.log(err);
      expect(true).to.equal(false);
    });
  });
});
