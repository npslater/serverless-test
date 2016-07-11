function S3Helper(client) {
  this._client = client;
}

S3Helper.prototype.getObject = function(params) {
  return new Promise(
    (resolve, reject) => {
      this._client.getObject(params, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    }
  );
};

module.exports = S3Helper;
