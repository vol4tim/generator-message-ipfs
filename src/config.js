const config = {
  WEB3_PROVIDER: "http://localhost:8545",
  IPFS: { host: 'localhost', 
    port: '5001'
  },
  TOPIC: 'aira-market',

  ACCOUNT_PRIVATE: '0xdd1a4b028f8b880db87d0fe1efad2f6c5f61db57972dd6dc67a487de44c616de',

  INTERVAL: 5,
  PRICE_MIN: 20,
  PRICE_MAX: 20,
  COLORS: ['red', 'blue', 'green', 'white'],
  MODELS: [ 'QmdLz4vvaos2tTXDDsJ3VqwqLAEeD9FdoRWvsK4EsdZssz' ],

  SECURITY_ADDRESS: "0xEbA07e5F2D4A49Bb3fB8eC038a7B622b5453B973",
  SECURITY_ABI: [{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"usedHash","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_sign","type":"bytes"}],"name":"signSplit","outputs":[{"name":"","type":"uint8"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_validationModel","type":"bytes"},{"name":"_objective","type":"bytes"},{"name":"_cost","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_saltA","type":"bytes32"},{"name":"_signA","type":"bytes"},{"name":"_saltB","type":"bytes32"},{"name":"_signB","type":"bytes"}],"name":"create","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"","type":"address"},{"indexed":true,"name":"","type":"address"}],"name":"Liability","type":"event"}]
}

export default config
