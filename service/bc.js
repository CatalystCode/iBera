
const Web3 = require('web3');
const bcPromisified = require('./bcPromisified');

const web3 = new Web3(new Web3.providers.HttpProvider());
const web3p = bcPromisified(web3);



async function getTransaction(hash) {

  console.log(`getTransaction: `, hash);
  if (!hash) throw new Error(`'hash' value was not provided`);

  try {
    var tx = await web3p.eth.getTransaction(hash);
    
    if (tx.input) {
      tx.inputAscii = web3.toAscii(tx.input);
      try {
        tx.inputObject = JSON.parse(tx.inputAscii);
      }
      catch(err) {
        console.warn(`input is not a JSON object: ${tx.inputAscii}`);
      }
    }
    
    return tx;
  }
  catch(err) {
    console.error(`error getting transaction '${hash}': ${err}`);
    throw err;
  }

}


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
    from: opts.from.address,
    to: opts.to.address,
    value: web3.toWei(opts.value, opts.units)
  };

  if (dataHex) {
    tx.data = dataHex
  }
  try {

    console.log(`sending transaction: ${JSON.stringify(tx, true, 2)}`);
    
    //var unlockResult = await web3p.personal.unlockAccount(opts.from.address, opts.from.password);
    //var result = await web3p.eth.sendTransaction(tx);

    var result = await web3p.personal.sendTransaction(tx, opts.from.password);

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
    var accounts = await web3p.eth.getAccounts();
    for (var i=0; i<accounts.length; i++) {
      var id = accounts[i];
      var balance = await web3p.eth.getBalance(id);
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
  getBalances,
  getTransaction,
  sendTransaction
}
