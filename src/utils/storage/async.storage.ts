const AsyncWebStorageWrapper = (function () {
  function AsyncStorageWrapper(this: any, storage) {
    this.storage = storage;
  }
  AsyncStorageWrapper.prototype.getItem = function (key) {
    return promisify(() => this.storage.getItem(key));
  };
  AsyncStorageWrapper.prototype.removeItem = function (key) {
    return promisify(() => this.storage.removeItem(key));
  };
  AsyncStorageWrapper.prototype.setItem = function (key, value) {
    return promisify(() => this.storage.setItem(key, value));
  };
  return AsyncStorageWrapper;
})();
export default AsyncWebStorageWrapper;

const promisify = (func) =>
  new Promise(function (resolve, reject) {
    try {
      resolve(func());
    } catch (err) {
      reject(err);
    }
  });
