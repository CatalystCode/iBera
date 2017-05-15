
const Web3 = require('web3');
const bcPromisified = require('./bcPromisified');

const web3 = new Web3(new Web3.providers.HttpProvider());
const promisified = bcPromisified(web3);


async function getBalances() {
  console.log('getting balances');
  var balances = {};
  try {
    var accounts = await promisified.getAccounts();
    for (var i=0; i<accounts.length; i++) {
      var id = accounts[i];
      var balance = await promisified.getBalance(id);
      balances[id] = web3.fromWei(balance, "ether");
    }
    return balances;
  }
  catch(err) {
    console.error(`error getting accounts: ${err}`);
    throw err;
  }
}; 

module.exports = {
  getBalances
}
