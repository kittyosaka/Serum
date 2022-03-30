const { MessageEmbed, version, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "uptime",
    category: "Utility",
    aliases: [ "upt" ],
    description: "Shows The Uptime Of The Bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      const duration1 = Math.round((Date.now() - message.client.uptime)/1000);
      const embed = new MessageEmbed()
      embed.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
      embed.setDescription(`I am online from <t:${duration1}:R>`)
      message.channel.send({embeds: [embed]})
    }
}