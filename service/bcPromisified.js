
var promisify = require("promisify-node");

function getPromisifiedWeb3(web3) {

  var bcProxy = {};
  [
    'getAccounts',
    'getBalance'
  ].forEach(funcName => {
    bcProxy[funcName] = function(cb) {
      web3.eth[funcName].apply(web3.eth, arguments);
    }
  });

  var promisified = promisify(bcProxy, undefined, true);
  return promisified;
}

module.exports = getPromisifiedWeb3;
