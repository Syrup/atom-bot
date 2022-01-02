import "dotenv/config"
import { Client, Collection, Intents } from "discord.js"
import { CommandConfig, SlashCommandConfig } from "@typings"
import * as winston from "winston"
import * as config from "@src/config.json"
import * as fs from "fs";
import events from "@handlers/events";
import slash from "@handlers/slash";
import commands from "@handlers/commands";
import server from "@src/server";

// let winston = require("winston")

class AtomClient extends Client {
  public readonly slashCommands: Collection<string, SlashCommandConfig> = new Collection();
  public readonly commands: Collection<string, CommandConfig> = new Collection();
  public readonly logger: winston.Logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    // format: winston.format.combine(
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      //winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      // winston.format.printf((log) => `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`)
      winston.format.printf((log) => `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`)
    )
  });
  public config = config;
 
  public constructor() {
    super({
     intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
      ]
    })    
  }

  public debug(): void {
    this.on("debug", (info: string): void => {
      this.logger.log("info", info)
    })
  }

  public init(): void {
    let port: number = this.config.port
    commands(this)
    slash(this)
    events(this)
    server(port);
    void this.login(process.env.TOKEN)  }
}
export default AtomClient