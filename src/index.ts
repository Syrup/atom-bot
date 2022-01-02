import "dotenv/config";
import 'module-alias/register';
import { Intents, Message } from "discord.js"
import Client from "@cores/Client"
import * as config from "./config.json"

const client = new Client()


if(client.config?.debug) {
  client.debug()
}


client.init()