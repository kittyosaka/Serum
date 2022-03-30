const {
  MessageEmbed
} = require(`discord.js`);
module.exports = {
  name: `nightcore`,
  category: `Filter`,
  premium: true, 
  description: `Applies Nightcore Filter To The Song`,
  usage: `Nightcore`,
   player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.players.get(message.guild.id);
    if(!player) return;
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
        "speed": 1.165,
        "pitch": 1.125,
        "rate": 1.05
      },
    });
    const emb = new MessageEmbed()
    .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
    .setDescription(`**Nightcore** FIlter Is Now **Enabled**`)
        if (!message.channel) return;
    return message.channel.send({embeds: [emb]})
    }
  }
    