import { SlashCommandConfig } from "@typings"
import Client from "@cores/Client"
import { CommandInteraction } from "discord.js"
// import { slashCommandBuilder }

const helloCommand: SlashCommandConfig = {
  name: "hello",
  description: "say hello 👋",
  run(client, message) {
    // message.deferReply()
    let opt = message.options!.get("opt")
    if(opt && opt!.value) {
      message.reply("with options")
    } else {
      message.reply("Hello 👋");
      message.followUp({ content: "alpin ~~jelek~~ ganteng ||jangan bilang bilang!||", ephemeral: true })
    }
  },
  options: [{
    run(opt) {
      return opt
      .setName("opt")
      .setDescription("with options")
    },
    type: "boolean"
  }]
}

export default helloCommand;
