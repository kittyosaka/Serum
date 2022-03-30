const { MessageEmbed, version, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "shard",
    category: "Utility",
    description: "Show the shard of the server",
    aliases: [ "cluster", "shards", "shardinfo" ],
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      const embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
      .addField(`Server Id`, `\`\`\`js\n${message.guild.id}\`\`\``)
      .addField(`Shard Id`, `\`\`\`js\n${message.guild.shardId}/${client.shard.count - 1}\`\`\``)
      .addField(`Node`, `\`\`\`js\nNode-01\`\`\``)
		message.channel.send({embeds: [embed]});
    }
}
