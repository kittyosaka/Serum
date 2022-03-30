const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
	name: "playerinfo",
    aliases: ["musicinfo"],
    category: "Music",
    description: "Shows The Settings Of The Music Player.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: false,
	 execute: async (message, args, client, prefix) => {
  
  const player = message.client.manager.get(message.guild.id);
  let rep = "";
if(player.trackRepeat) rep = "🔂 Track";
if(player.queueRepeat) rep = "🔁 Queue";
if(!player.queueRepeat && !player.trackRepeat) rep = "<:cross1:853965073383292970> Disabled";
  const em = new MessageEmbed()
    .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
    .setAuthor(`Music Settings For ${message.guild.name}`, client.user.displayAvatarURL(), "https://discord.gg/M2yU2Nzydj")
    .setDescription(`**Now Playing - ${player.queue.current ? `[${player.queue.current.title.substring(0, 63)}](${player.queue.current.uri})` : "Nothing"}**`)
    .addField(`**Queue Length**`, `**${player.queue.length}**`, true)
    .addField(`**Song Paused**`, `${player.paused ? "**<:Success:853965334297444393> Yes**" : "**<:cross1:853965073383292970> No**"}`,true)
    .addField(`**Looping**`, `**${rep}**`, true)
    .addField(`Volume`, `**${player.volume}%**`, true)
    .addField(`**Autoplay**`, await client.db.get(`auto_${message.guild.id}`) === `true` ? "**<:Success:853965334297444393> Enabled**" : "**<:cross1:853965073383292970> Disabled**", true)
    .addField(`**24/7**`, await client.db.get(`247_${message.guild.id}`) === `true` ? "**<:Success:853965334297444393> Enabled**" : "**<:cross1:853965073383292970> Disabled**", true)
    .addField(`**Current Voice Channel**`, `<#${player.voiceChannel}>`, true)
    .addField(`**Current Text Channel**`, `<#${player.textChannel}>`, true)
    message.channel.send({embeds: [em]})
   }
}