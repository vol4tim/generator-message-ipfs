import Ipfs from "ipfs-api"
import config from "./config"

const ipfs = Ipfs(config.IPFS.host, config.IPFS.port)

console.log('Start subscribe', config.TOPIC)

ipfs.pubsub.subscribe(config.TOPIC, (msg) => {
  console.log('New demand item:')
  const data = Buffer.from(msg.data);
  console.log(JSON.parse(data.toString('utf8')));	
})
