import { Message } from "discord.js";
import Client from "@cores/Client"

export default {
  name: "messageCreate",
  run(client: Client, message: Message): void {
    let args: string[] = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g)
    // console.log(args)
    let command = args.shift()!.toLowerCase()
    // console.log(command)
    let cmd = client.commands.get(command)
    if(!message.content.startsWith(client.config.prefix)) return
    try {
      if(cmd?.dev && !client.config.ownersID.includes(message.author.id)) return
      cmd?.run(client, message, args)
    } catch (e) {
      message.reply(( e as string ).toString());
      console.error(e);
    }
  }
}