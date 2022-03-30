const { MessageEmbed } = require("discord.js");

module.exports = {
  	name: "remove",
    category: "Music",
  	description: "Removes the specified song from the queue.",
	  args: true,
    usage: "<Number of song in queue>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
        }

        const position = (Number(args[0]));
        if (!position || position < 0 || position > player.queue.size) {
            const number = (position);
            let thing = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`The number cannot be greater or less than the size of the queue.`);
            return message.channel.send({embeds: [thing]});
        }

    const song = player.queue[position - 1]
		player.queue.remove(position - 1);

		const emojieject = message.client.emoji.remove;

		let thing = new MessageEmbed()
      .setAuthor("Removed from Queue")
			.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
			.setDescription(`[${song.title}](${song.uri})`)
		  return message.channel.send({embeds: [thing]});
	
    }
};