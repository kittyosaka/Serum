const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "volume",
	aliases: ["v", "vol"],
	category: "Music",
	description: "Lets you change the bots output volume.",
	  args: false,
    usage: "<0 - 150>",
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
		
		const volumeEmoji = message.client.emoji.volumehigh;

		if (!args.length) {
			let thing = new MessageEmbed()
			.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
			.setDescription(`${volumeEmoji} The current volume is: **${player.volume}%**`)
			return message.channel.send({embeds: [thing]});
		}

		const volume = Number(args[0]);
		
		if (!volume || volume < 0 || volume > 150) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`<Provide the Number of volume between 0 - 150>`)
            return message.channel.send({embeds: [thing]});
		}
    const curv = player.volume;
		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = message.client.emoji.volumehigh;
			let thing = new MessageEmbed()
				.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
				.setTimestamp()
				.setDescription(`The volume has been changed from **${curv}%** to **${volume}%**`)
		  return message.channel.send({embeds: [thing]});
		} else if (volume < player.volume) {
			var emojivolume = message.client.emoji.volumelow;
			let thing = new MessageEmbed()
				.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
				.setDescription(`The volume has been changed from **${curv}%** to **${volume}%**`)
		  return message.channel.send({embeds: [thing]});
		} else {
			let thing = new MessageEmbed()
				.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
				.setDescription(`The volume has been changed from **${curv}%** to **${volume}%**`)
			return message.channel.send({embeds: [thing]});
		}
		
 	}
};