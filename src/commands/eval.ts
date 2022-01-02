import { CommandConfig } from "@typings";
import Client from "@cores/Client";
import { inspect } from "util";

const evalCommand: CommandConfig = {
  name: 'eval',
  dev: true,
  description: "Eval Command",
  async run(client, message, args) {
    const depthFlagRegex = /^--depth=?(.*)$/;
    let async = args?.includes("--async");
    let silent = args?.includes("--silent");
    let depth = args?.some(e => depthFlagRegex.test(e));
    let depths = depth ? parseInt(
      depthFlagRegex
      .exec(
        args?.find(e => depthFlagRegex
        .exec(e))!)![1],10) || 0 : 0;
    const code = args?.filter(e => !/^--(async|silent|depth=?(.*))$/.test(e)).join(" ");
    // let code = args?.filter(e => !/!^--(async|depth=?(.*))$/.test(e)).join(" ")
    // message.reply("Hello")
    let promise = false

    try {
      let evaled = eval(async ? `(async () => { ${code!} })()` : code!)
      let inspected = typeof evaled === "string" ? evaled : inspect(evaled, { depth: depths });
      if(evaled instanceof Promise) {
        evaled = await evaled;
        promise = true;
      }

      /* if(promise) {
        inspected = `Promise<${typeof code === "string" ? inspect(inspected) : inspected}>`;
    } */
      if(silent) return

      await message.reply(`\`\`\`js\n${inspected}\n\`\`\``)
     } catch (e) {
      message.reply(`\`\`\`js\n${e}\n\`\`\``)
    }
  }
}

export default evalCommand;