const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');

module.exports = {
	name: "seek",
	category: "Music",
	description: "Skips to the specified timestamp in the currently playing track",
	args: true,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
        }

        const time = ms(args[0])
        const position = player.position;
        const duration = player.queue.current.duration;

        const emojiforward = message.client.emoji.forward;
        const emojirewind = message.client.emoji.rewind;

        const song = player.queue.current;
        
        if ((Number(args[0]) < 0 && args[0] > 0)|| ( Number(args[0]) <= player.queue.current.duration / 1000) && args[0] > 0 ) {

    
    function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + "m " + (s < 10 ? "0" : "") + s+"s";
    else return (h < 10 ? "0" : "") + h + "h " + (m < 10 ? "0" : "") + m + "m " + (s < 10 ? "0" : "") + s+"s";
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}
                player.seek(Number(args[0]) * 1000);
                let thing = new MessageEmbed()
                    .setDescription(`Seeked To ${format(Number(args[0]) * 1000)}`)
                    .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
          return message.channel.send({embeds: [thing]});
            
        } else {
            let thing = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`Enter a valid timestamp`);
            return message.channel.send({embeds: [thing]});
        }
	
    }
};