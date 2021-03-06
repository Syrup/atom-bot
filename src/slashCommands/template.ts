import { SlashCommandConfig } from "@typings"

const command: SlashCommandConfig = {
  name: "command",
  description: "a command",
  run(client, message) {
    let world = message.options!.get("world")
    if(world?.value) {
      message.reply("hello world")
    }   message.reply("hello")
  },
  // can add more than 2 options
  // optional
  options: [{
    run(opt) {
      return opt
        .setName("world")
        .setDescription("with world")
      // optional
      // .setRequired(false)
    },
    /* available types:
    * -  string
    * -  boolean
    * -  number
    * -  integer
    * -  user
    * -  channel
    * -  mentionable
    * -  role
    */
    type: "string"
  }]
}
