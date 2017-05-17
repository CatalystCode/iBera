# iBera Blockchain Service

## Setup

* Create a `genesis.json` file with the following content

```json
{
  "config": {
		"chainId": 15,
		"homesteadBlock": 0,
		"eip155Block": 0,
		"eip158Block": 0
  },
  "nonce": "0x000000000000002a",
  "difficulty": "0x20000",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "author": "0x0000000000000000000000000000000000000000",
  "timestamp": "0x00",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "extraData": "0x",
  "gasLimit": "0x2fefd8",
  "alloc": {}
}
```

* Initialize node

```
	geth --datadir ./data init genesis.json
```

* Start node without mining

```
	geth --rpc --datadir ./data --ipcpath "/Users/<yourUserAccount>/Library/Ethereum/geth.ipc" --networkid 1234 --maxpeers 1 console
```

* Create an account using the console

```
	personal.newAccount("<yourPassword>")
```

* Exit the console using the `exit` command and start over with the mining flags:

```
	geth --rpc --datadir ./data --ipcpath "/Users/<yourUserAccount>/Library/Ethereum/geth.ipc" --networkid 1234 --mine --minerthreads 1 --maxpeers 1 --rpcapi=eth,web3,personal console
```

## Use Ethereum Wallet
You can use [Ethereum Wallet](https://www.ethereum.org/) to access the local private blockchain, send transactions and create accounts.

