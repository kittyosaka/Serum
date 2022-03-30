const {
  MessageEmbed
} = require(`discord.js`);
module.exports = {
  name: `bassboost`,
  category: `Filter`,
  premium: true, 
  aliases: [`bb`],
  description: `Changes the Bass gain`,
  usage: `bassboost <none/low/medium/high>`,
   player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
        const player = message.client.manager.players.get(message.guild.id);
    if(!player) return;
    let level = `none`;
    if (!args.length)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
          .setDescription(`<none/low/medium/high>`)
        ]
      });
    level = args[0].toLowerCase();
    switch (level) {
      case `none`:
        
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
            if (!message.channel) return;
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setDescription(`BassBoost Level Set To **None**`)
      ]
    });
        break;
      case `low`:
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
        var bands = [
                { band: 0, gain:0.0625 },
                { band: 1, gain: 0.125 },
                { band: 2, gain: -0.125 },
                { band: 3, gain: -0.0625 },
                { band: 4, gain: 0 },
                { band: 5, gain: -0.0125 },
                { band: 6, gain: -0.025 },
                { band: 7, gain: -0.0175 },
                { band: 8, gain: 0 },
                { band: 9, gain: 0 },    
                { band: 10, gain: 0.0125 },    
                { band: 11, gain: 0.025 },
                { band: 12, gain: 0.375 },   
                { band: 13, gain: 0.125 },  
                { band: 14, gain: 0.125 }    
            ];
             player.setEQ(...bands);
            if (!message.channel) return;
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setDescription(`BassBoost Level Set To **Low**`)
      ]
    });
        break;
      case `medium`:
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
        var bands = [
                { band: 0, gain: 0.125 },
                { band: 1, gain: 0.25 },
                { band: 2, gain:  -0.25 },
                { band: 3, gain: -0.125 },
                { band: 4, gain: 0 },
                { band: 5, gain: -0.0125 },
                { band: 6, gain: -0.025 },
                { band: 7, gain: -0.0175 },
                { band: 8, gain: 0 },
                { band: 9, gain: 0 },    
                { band: 10, gain: 0.0125 },    
                { band: 11, gain: 0.025 },
                { band: 12, gain: 0.375 },   
                { band: 13, gain: 0.125 },  
                { band: 14, gain: 0.125 }    
            ];
             player.setEQ(...bands);
            if (!message.channel) return;
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setDescription(`BassBoost Level Set To **Medium**`)
      ]
    });
        break;
      case `high`:
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
        var bands = [
                { band: 0, gain: 0.1875 },
                { band: 1, gain: 0.375 },
                { band: 2, gain: -0.375 },
                { band: 3, gain: -0.1875 },
                { band: 4, gain: 0 },
                { band: 5, gain: -0.0125 },
                { band: 6, gain: -0.025 },
                { band: 7, gain: -0.0175 },
                { band: 8, gain: 0 },
                { band: 9, gain: 0 },    
                { band: 10, gain: 0.0125 },    
                { band: 11, gain: 0.025 },
                { band: 12, gain: 0.375 },   
                { band: 13, gain: 0.125 },  
                { band: 14, gain: 0.125 }    
            ];
             player.setEQ(...bands);
            if (!message.channel) return;
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setDescription(`BassBoost Level Set To **High**`)
      ]
    });
             break;
      case `earrape`:
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
        var bands = [
                { band: 0, gain: 0.25 },
                { band: 1, gain: 0.5 },
                { band: 2, gain: -0.5 },
                { band: 3, gain: -0.25 },
                { band: 4, gain: 0 },
                { band: 5, gain: -0.0125 },
                { band: 6, gain: -0.025 },
                { band: 7, gain: -0.0175 },
                { band: 8, gain: 0 },
                { band: 9, gain: 0 },    
                { band: 10, gain: 0.0125 },    
                { band: 11, gain: 0.025 },
                { band: 12, gain: 0.375 },   
                { band: 13, gain: 0.125 },  
                { band: 14, gain: 0.125 }    
            ];
             player.setEQ(...bands);
            if (!message.channel) return;
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setDescription(`BassBoost Level Set To **Earrape**`)
      ]
    });
        break;
    }

  }
};
