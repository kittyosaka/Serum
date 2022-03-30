const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { post } = require("node-superfetch");

module.exports = {
    name: "eval",
    aliases: ["ev"],
    category: "Owner",
    description: "Eval Code",
    args: false,
    usage: "<string>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
const player = message.client.manager.get(message.guild.id);
 const row = new MessageActionRow()
           .addComponents(new MessageButton()
    .setLabel("DELETE")
    .setCustomId('DELETE_BUT')
    .setStyle("DANGER"));

      const em1 = new MessageEmbed();
if (!client.owner.includes(message.author.id)) {
   return;
};

       let a = "";

        try {
            const code = args.join(" ");
            if (!code) return  message.channel.send({content: `\`\`\`js\nundefined\`\`\``, components: [row]});
            let evaled;

            if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
                evaled = "No, shut up, what will you do it with the token?";
            } else {
                evaled = await eval(code);
            }

            if (typeof evaled !== "string") evaled = await require("util").inspect(evaled, { depth: 0 });

            let output = clean(evaled);
            if (output.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(output);
                a += `https://hastebin.com/${body.key}.js`;
              
            } else {
                a += "```js\n" + output + "```";
            }

            message.channel.send({content: `${a}`, components: [row]});

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(err);
                a += `https://hastebin.com/${body.key}.js`;
            } else {
                a += "```js\n" + err + "```";
            }

             message.channel.send({content: `${a}`, components: [row]});
        }
    }
}

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}
