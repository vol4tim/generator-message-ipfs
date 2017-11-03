import Ipfs from "ipfs-api"
import random from "lodash/random"
import config from "./config"

const ipfs = Ipfs(config.IPFS.host, config.IPFS.port)

const publish = (topic, data) => {
  const msg = new Buffer(JSON.stringify(data))
  ipfs.pubsub.publish(topic, msg, (err) => {
    if (err) {
      throw err
    }
    console.log('Publish new item');
  })
}

setInterval(() => {
  const data = {
    spec: config.COLORS[random(config.COLORS.length - 1)],
    price: random(config.PRICE_MIN, config.PRICE_MAX),
    address: config.ACCOUNTS[random(config.ACCOUNTS.length - 1)]
  }
  publish(config.TOPIC, data)
}, config.INTERVAL * 1000);
