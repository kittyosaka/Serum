const { Util, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "previous",
    category: "Music",
    aliases: ["back"],
    description: "Plays The Previous Song",
    permission: [],
    args: false,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
   execute: async (message, args, client, prefix) => {
const { channel } = message.member.voice;
        var player = message.client.manager.get(message.guild.id);
        const err = new MessageEmbed();
         err.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor);
        if (!player.queue.current) {
                err.setDescription("There Is Nothing Playing..");
            return message.channel.send({embeds: [err]});
        }
        if(!player.queue.previous){
          err.setDescription(`There Is No Previous Song`)
          return message.channel.send({embeds: [err]});
        }
        else {
            player.queue.unshift(player.queue.previous);
            player.stop();
            return message.react(`⏮️`)
        }
   }
}
        