import Client from "@cores/Client";
import * as fs from "fs";
let files = fs.readdirSync("build/commands")
  .filter(x => x.endsWith(".js"))
  
export default function(client: Client) {
  for(let file of files) {
    let cmd = require(`../commands/${file}`).default

    client.commands.set(cmd.name, cmd)
  }
}