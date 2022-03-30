const { MessageEmbed, WebhookClient } = require('discord.js');
const { Webhooks: {player_create} } = require('../../config.json');
module.exports = async (client, player) => {

const web1 = new WebhookClient({ url: player_create }); 

const server = client.guilds.cache.get(player.guild);
const embed = new MessageEmbed()
.setColor("#00ff3c")
.setAuthor("Player Created", client.user.displayAvatarURL())
.setDescription(`Id: **${player.guild}**\nName: **${server.name}**`)

web1.send({embeds: [embed]})
}