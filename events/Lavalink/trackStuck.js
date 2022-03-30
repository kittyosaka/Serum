const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription("❌ Error when loading song! Track is stuck");
    channel.send({embeds: [thing]});
    client.logger.log(`Error when loadinzg song! Track is stuck in [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}