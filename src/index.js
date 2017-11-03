import Ipfs from "ipfs-api"
import Web3 from "web3"
import bs58 from "bs58"
import sha3 from 'solidity-sha3'
import align from "string-align"
import random from "lodash/random"
import config from "./config"

const ipfs = Ipfs(config.IPFS.host, config.IPFS.port)
const web3 = new Web3(new Web3.providers.HttpProvider(config.WEB3_PROVIDER))

const publish = (topic, data) => {
  const msg = new Buffer(JSON.stringify(data))
  ipfs.pubsub.publish(topic, msg, (err) => {
    if (err) {
      throw err
    }
    console.log('Publish new item')
  })
}

const mkBuy = (topic, data) => {
  var msg = {
    validationModel: '0x' + bs58.decode(config.MODELS[random(config.MODELS.length - 1)]).toString('hex'),
    objective: '0x' + bs58.decode("QmdLz4vvaos2tTXDDsJ3VqwqLAEeD9FdoRWvsK4EsdZssz").toString('hex'),
    cost: random(config.PRICE_MIN, config.PRICE_MAX),
    salt: web3.utils.randomHex(32) 
  }
  const msg_data = msg.validationModel.substr(2) 
                 + msg.objective.substr(2) 
                 + msg.cost.toString(16)
                 + msg.salt.substr(2)
  const s = web3.eth.accounts.sign(new Buffer(msg_data, 'hex'), config.ACCOUNT_PRIVATE)
  msg.signature = s.signature 
  console.log(msg)
  return msg
}

const mkSell = (topic, data) => {
  var msg = {
    validationModel: '0x' + bs58.decode(config.MODELS[random(config.MODELS.length - 1)]).toString('hex'),
    fee: 10,
    cost: random(config.PRICE_MIN, config.PRICE_MAX),
    salt: web3.utils.randomHex(32)
  }
  const msg_data = msg.validationModel.substr(2)
                 + msg.fee.toString(16)
                 + msg.cost.toString(16)
                 + msg.salt.substr(2) 
  const signature = web3.eth.accounts.sign(new Buffer(msg_data, 'hex'), config.ACCOUNT_PRIVATE)
  msg.signature = signature.signature 
  console.log(msg)
  return msg
}

setInterval(() => {
  publish(config.TOPIC, mkBuy())
  publish(config.TOPIC, mkSell())
}, config.INTERVAL * 1000)
