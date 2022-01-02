import Client from "../cores/Client"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { SlashCommandConfig, CommandConfig } from "@typings"

export default {
  name: "ready",
  run(client: Client): void {
    const rest = new REST({
    version: "9"
  }).setToken(process.env.TOKEN!);
  client.logger.log("info", client.user!.tag+" Ready!")
  // console.log(client.commands)
  client.logger.log("info", 'Started refreshing application (/) commands.');
  try {
    client.slashCommands.forEach(async (c: SlashCommandConfig): Promise<void> => {
      // console.log(c)
        if(c.global) {
          await rest.put(
            Routes.applicationCommands("757215502245298228"),
            { body: c?.data },
          );
        } else {
          await rest.put(
            Routes.applicationGuildCommands("757215502245298228", "380289224043266048"),
            { body: c?.data },
          );
        }

      client.logger.log("info", `/${c.name} registered.`)
    })
    client.logger.log("info", `Loaded ${client.slashCommands.size}/${client.commands.size} command(s).`)
    client.commands.forEach((c: CommandConfig): void => {
      client.logger.log("info", `${c.name} registered.`)
    })
  } catch (e) {
    client.logger.error(e)
  }
  }
}