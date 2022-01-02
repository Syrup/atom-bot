import "dotenv/config"
import { Interaction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import Client from "@cores/Client"
import { SlashCommandConfig } from "@typings"
import * as fs from "fs"
// type optFn = (opt)
var command = new SlashCommandBuilder()

declare var commands: SlashCommandConfig;
let dirs = fs.readdirSync("build/slashCommands", { encoding: 'utf8' })
// console.log(dirs)
// var command

async function run(client: Client) {
  try {
    (async () => {
      for (let dir of dirs) {
        let check = fs.lstatSync(`build/slashCommands/${dir}`)
        if(!check.isDirectory()) return
        
        let files = fs.readdirSync(`build/slashCommands/${dir}`)
          // console.log(files)

          for(let file of files) {
            if(!file.endsWith(".js")) return
            let cmd = require(`../../build/slashCommands/${dir}/${file}`)            
            cmd = cmd.default
            
            cmd.data = []
            let builder = command

            

            if(cmd?.options) {
        for(let opt of cmd?.options) {
          // builder.addStringOption(opt.run)
          /*
          if(opt.type === "string") builder.addStringOption(opt.string)
          else if(opt.type === "number") builder.addIntegerOption(opt.integer)
          else if(opt.type === 'integer') builder.addNumberOption(opt.number)
          // else if(opt.type === "subcommand") builder.addSubcommandOption(opt.run)
          else if(opt.type === 'boolean') builder.addBooleanOption(opt.boolean)
          else if(opt.type === "channel") builder.addChannelOption(opt.channel)
          else if(opt.type === 'mentionable') builder.addMentionableOption(opt.mentionable)
          else if(opt.type === 'user') builder.addUserOption(opt.user)
          else if(opt.type === "role") builder.addRoleOption(opt.role)
          */


          if(opt.type === "string") builder.addStringOption(opt.run)
          else if(opt.type === "number") builder.addIntegerOption(opt.run)
          else if(opt.type === 'integer') builder.addNumberOption(opt.run)
          // else if(opt.type === "subcommand") builder.addSubcommandOption(opt.run)
          else if(opt.type === 'boolean') builder.addBooleanOption(opt.run)
          else if(opt.type === "channel") builder.addChannelOption(opt.run)
          else if(opt.type === 'mentionable') builder.addMentionableOption(opt.run)
          else if(opt.type === 'user') builder.addUserOption(opt.run)
          else if(opt.type === "role") builder.addRoleOption(opt.run)
        }
      }
            cmd.data.push(
              command
              .setName(cmd.name)
              .setDescription(cmd.description)
            )
                        
            // console.log(cmd)
              client.slashCommands.set(cmd.name, cmd)
          }
      }
      
      try {
        
        // console.log(rest)

        
        
        // await rest.put()
      } catch (error) {
        console.error(error)
      }
    })()
  } catch (e) {
    console.error(e)
  }
}

export default run;