const {
  MessageEmbed
} = require(`discord.js`);
module.exports = {
  name: `8d`,
  category: `Filter`,
  premium: true, 
  description: `Applies a 8D Filter`,
  usage: `8d`,
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
      rotation: {
        "rotationHz": 0.1,
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

        .setDescription(`**8d** Filter Is Now **Enabled**`)
      ]
    });
  }
};
