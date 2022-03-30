const {
  MessageEmbed
} = require(`discord.js`);
module.exports = {
  name: `clearfilter`,
  category: `Filter`,
  aliases: [`cf`],
  description: `Clears All The Filters`,
  usage: `cf`,
   player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    var player = message.client.manager.players.get(message.guild.id);
    player.clearEQ();
        player.node.send({
      op: "filters",
      guildId: message.guild.id,
      equalizer: player.bands.map((gain, index) => {
        var Obj = {
          "band": 0,
          "gain": 0,
        };
        Obj.band = Number(index);
        Obj.gain = Number(gain)
        return Obj;
      }),
      timescale: {
            "speed": 1.0,
            "pitch": 1.0,
            "rate": 1.0
          },
    });
    const msg = new MessageEmbed()
    .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
    .setDescription(`All Filters Are Now **Disabled**`)
    message.channel.send({embeds: [msg]});
  }
}