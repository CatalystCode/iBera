
var promisify = require("promisify-node");

function getPromisifiedWeb3(web3) {


  function promisifyObject(funcs, objName) {

    var obj = {};
    funcs.forEach(funcName => {
      obj[funcName] = function(cb) {
        web3[objName][funcName].apply(web3[objName], arguments);
      }
    });

    return promisify(obj, undefined, true);
  }

  var web3Promisified = {
    
    eth: promisifyObject([
        'getAccounts',
        'getBalance',
        'getTransaction',
        'sendTransaction',
      ], 'eth'),

    personal: promisifyObject([
      'lockAccount',
      'sendTransaction',
      'unlockAccount'      
    ], 'personal')
  };

  return web3Promisified;
}

module.exports = getPromisifiedWeb3;
