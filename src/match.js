import Ipfs from "ipfs-api"
import Web3 from "web3"
import config from "./config"

const ipfs = Ipfs(config.IPFS.host, config.IPFS.port)
const web3 = new Web3(new Web3.providers.HttpProvider(config.WEB3_PROVIDER))

const sec = new web3.eth.Contract(config.SECURITY_ABI, config.SECURITY_ADDRESS, {from: "0x4af013AfBAdb22D8A88c92D68Fc96B033b9Ebb8a"})

console.log(sec.options)

console.log('Start matcher', config.TOPIC)

var sells = new Set();
var buys = new Set();

const rematch = () => {
  for (let s of sells)
    for (let b of buys)
      if (s.cost == b.cost && s.validationModel == b.validationModel) {
        console.log('Found match: ' + s.validationModel + ' with price ' + s.cost)

        console.log(s.validationModel, b.objective, s.cost, s.fee, s.salt, s.signature, b.salt, b.signature) 
        console.log(b)
        sec.methods.create(s.validationModel, b.objective, s.cost, s.fee, s.salt, s.signature, b.salt, b.signature).send() 

        sells.delete(s)
        buys.delete(b)
      }
  console.log(sells)
  console.log(buys)
}

ipfs.pubsub.subscribe(config.TOPIC, (msg) => {
  console.log('New demand item: ' + msg.data)
  const order = JSON.parse(Buffer.from(msg.data).toString('utf8'));	

  if ('fee' in order)
    sells.add(order)
  else
    buys.add(order)

  rematch()
})
