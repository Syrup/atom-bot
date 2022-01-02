import Client from "@cores/Client"
import * as fs from "fs"

export default async function(client: Client) {
  try {
    let files = fs.readdirSync("build/events")
      .filter(x => x.endsWith(".js"))
    // console.log(files.filter(x => x.endsWith(".js")))
    
    for(let file of files) {
      //if(!file.endsWith(".js")) return
      let event = require(`../events/${file}`)
      event = event.default 
      // console.log(event)
      // console.log(file)

      client.on(event.name, (...args) => event.run(client, ...args))
    }
  } catch (e) {
    console.error(e)
  }
}