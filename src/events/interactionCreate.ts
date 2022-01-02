import Client from "@cores/Client"
import { CommandInteraction } from "discord.js"

export default {
  name: "interactionCreate",
  run(client: Client, interaction: CommandInteraction) {
    if(!interaction.isCommand()) return

    let cmd = client.slashCommands.get(interaction.commandName)

    if(interaction.commandName === cmd?.name) {
      cmd?.run(client, interaction)
    }
  }
}