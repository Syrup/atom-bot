import
{
  SlashCommandBooleanOption,
  SlashCommandStringOption,
  SlashCommandUserOption,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption
} from "@discordjs/builders"
import { CommandInteraction, Message } from "discord.js"
import Client from "@cores/Client"
type SlashCommandOptions = SlashCommandBooleanOption|SlashCommandStringOption|SlashCommandUserOption|SlashCommandChannelOption|SlashCommandIntegerOption|SlashCommandMentionableOption|SlashCommandNumberOption|SlashCommandRoleOption;

interface SlashCommandOption {
  /*
  string?(opt: SlashCommandStringOption): SlashCommandStringOption,
  boolean?(opt: SlashCommandBooleanOption): SlashCommandBooleanOption,
  user?(opt: SlashCommandUserOption): SlashCommandUserOption,
  mentionable?(opt: SlashCommandMentionableOption): SlashCommandMentionableOption,
  channel?(opt: SlashCommandChannelOption): SlashCommandChannelOption,
  integer?(opt: SlashCommandIntegerOption): SlashCommandIntegerOption,
  role?(opt: SlashCommandRoleOption): SlashCommandRoleOption,
  number?(opt: SlashCommandNumberOption): SlashCommandNumberOption,
  */
  run(opt: SlashCommandOptions): SlashCommandOptions,
  type: string
}

export interface SlashCommandConfig {
  name: string,
  description: string,
  data?: object[],
  run(client: Client, message: CommandInteraction): void,
  options?: SlashCommandOption[],
  global?: boolean
}

export interface CommandConfig {
  name: string
  description: string,
  aliases?: string[],
  dev?: boolean,
  run(client: Client, message: Message, args?: string[]): void
}