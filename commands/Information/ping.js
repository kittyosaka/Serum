const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Utility",
    description: "Shows bot's Latency.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
  
let embed = new MessageEmbed()
            .addField(`**Message Latency**`, `\`\`\`nim\nPinging\`\`\`\u200b`)
            .addField(`\u200b**API Latency**`, `\`\`\`nim\nPinging\`\`\``)
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        const g = await message.channel.send({embeds: [embed]})

        embed = new MessageEmbed()
            .addField(`**Message Latency**`, `\`\`\`nim\n${g.createdTimestamp - message.createdTimestamp}ms\`\`\`\u200b`)
            .addField(`\u200b**API Latency**`, `\`\`\`nim\n${Math.round(client.ws.ping)}ms\`\`\``)
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        g.edit({embeds: [embed]})
    }
}