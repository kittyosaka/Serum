const { MessageEmbed, WebhookClient } = require('discord.js');
const { Webhooks: {server_remove}, logs1 } = require('../../config.json');
const moment = require('moment');

module.exports = async (client, guild) => {
  const ser = await client.shard.broadcastEval(client => client.guilds.cache.size)
  .then(results => results.reduce((prev, val) => prev + val, 0))
  const use = await client.shard.broadcastEval(c => c.guilds.cache.filter((guild) => guild.available).reduce((prev, guild) => prev + guild.memberCount, 0))
    .then(results => 
        results.reduce((acc, memberCount) => acc + memberCount, 0))

  const player = client.manager.get(guild.id);
  if(player) player.destroy();
  const channel = client.channels.cache.get(logs1);
  let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount
})
let links = `https://cdn.discordapp.com/banners/`+guild.id+`/`+guild.banner+`.`+`webp?size=1024`;
  const embed = new MessageEmbed()
    .setDescription(`Id: **${guild.id}**\nName: **${guild.name}**\nMemberCount: \`${guild.memberCount + 1}\`\nCreated At: <t:${Math.round(guild.createdTimestamp/1000)}> (<t:${Math.round(guild.createdTimestamp/1000)}:R>)\nJoined At: <t:${Math.round(guild.joinedTimestamp/1000)}> (<t:${Math.round(guild.joinedTimestamp/1000)}:R>)`)
      
    .addField(`**${client.user.username}'s Total Servers**`, `\`\`\`js\n${ser}\`\`\``, true)
    .addField(`**${client.user.username}'s Total Users**`, `\`\`\`js\n${use}\`\`\``, true)
    if(guild.available) embed.setTitle(guild.name)
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024})) 
    .setColor(client.config.embedColor)
    if(guild.vanityURLCode)
    {
      let temp = `https://discord.gg/`+guild.vanityURLCode;
    embed.setURL(temp)
    }
    if(guild.banner)
    embed.setImage(links)
    const web3 = new WebhookClient({ url: server_remove });
    web3.send({content: "**Server Left**", embeds: [embed]})
}