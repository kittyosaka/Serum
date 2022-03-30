const {
  MessageEmbed
} = require(`discord.js`);
module.exports = {
  name: `tremolo`,
  category: `Filter`,
  premium: true, 
  description: `Applies a Tremolo Filter`,
  usage: `tremolo`,
   player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!player) return;

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
      tremolo: {
        "frequency": 4.0, // 0 < x
        "depth": 0.75 // 0 < x ≤ 1
      },
      timescale: {
            "speed": 1.0,
            "pitch": 1.0,
            "rate": 1.0
          },
    });
    if (!message.channel) return;
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)

        .setDescription(`**Tremolo** Filter Is Now **Enabled**`)
      ]
    });
  }
};
