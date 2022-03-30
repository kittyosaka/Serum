const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {

  if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor(channel.guild.me.displayHexColor !== '#000000' ? channel.guild.me.displayHexColor : client.config.embedColor)
        .setDescription("❌ Error when loading song! Track is error");
    channel.send({embeds: [thing]});
    client.logger.log(`Error when loading song! Track is error in [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}