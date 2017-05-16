
const Web3 = require('web3');
const bcPromisified = require('./bcPromisified');

const web3 = new Web3(new Web3.providers.HttpProvider());
const promisified = bcPromisified(web3);



async function sendTransaction(opts = {}) {

  console.log(`sendTransaction: `, JSON.stringify(opts, true, 2));
  if (!opts.from) throw new Error(`'from' value was not provided`);
  if (!opts.to) throw new Error(`'to' value was not provided`);
  if (!opts.value) throw new Error(`'value' value was not provided`);
  opts.units = opts.units || 'ether';

  var dataHex;
  if (opts.data) {
    var data = typeof opts.data === 'object' ? JSON.stringify(opts.data) : opts.data.toString();
    dataHex = web3.toHex(data);
  }

  let tx = {
    from: opts.from,
    to: opts.to,
    value: web3.toWei(opts.value, opts.units)
  };

  if (dataHex) {
    tx.data = dataHex
  }
  try {

    // TODO: unlock accounts

    console.log(`sending transaction: ${JSON.stringify(tx, true, 2)}`);
    var result = await promisified.sendTransaction(tx);

    // TODO: lock accounts
    
    return result;
  }
  catch(err) {
    console.error(`error sending transaction: ${err}`);
    throw err;
  }

}

/**
 * Gets balances for all accounts
 * 
 * @returns 
 */
async function getBalances() {
  console.log(`getBalances`);
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
  sendTransaction,
  getBalances
}
