import { SlashCommandConfig } from "@typings"
import Client from "@cores/Client"
import { CommandInteraction } from "discord.js"
// import { slashCommandBuilder }

const helloCommand: SlashCommandConfig = {
  name: "hello",
  description: "say hello 👋",
  run(client, message) {
    // message.deferReply()
    let alpin = message.options!.get("alpin")
    // console.log(alpin, Boolean(alpin))
    if(alpin && alpin!.value) {
      message.reply("<@271576733168173057>")
    } else {
      message.reply("Hello 👋");
      message.followUp({ content: "alpin ~~jelek~~ ganteng ||jangan bilang bilang!||", ephemeral: true })
    }
  },
  options: [{
    run(opt) {
      return opt
      .setName("alpin")
      .setDescription("panggil alpin")
    },
    type: "boolean"
  }]
}

export default helloCommand;