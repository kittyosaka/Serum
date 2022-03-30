const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const Discord = require("discord.js");

module.exports = async (client, player, oldChannel, newChannel) => {
  const guild = client.guilds.cache.get(player.guild)
  if(!guild) return player.destroy();
  let data = await client.db.get(`247_${guild.id}`);
  let ch = await guild.channels.cache.get(player.voiceChannel)
  let channel = await guild.channels.cache.get(player.textChannel)
  if(newChannel)
  {
    player.set('moved', true)
    player.setVoiceChannel(newChannel)
    player.pause(false)
  }
  else if(data === `true` && ch){
    player.setVoiceChannel(oldChannel)
    player.pause(false)
    channel.send({embeds: [new MessageEmbed().setColor(channel.guild.me.displayHexColor !== '#000000' ? channel.guild.me.displayHexColor : client.config.embedColor).setDescription(`Reconnected as **24/7** was **enabled**`)]}).then(message => {     setTimeout(function() {  message.delete()}, 2500)})
  }
  else
  {
    return player.destroy();
  }
}