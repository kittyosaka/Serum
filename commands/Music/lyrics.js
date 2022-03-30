const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "lyrics",
    aliases: ["ly"],
    category: "Music",
    description: "Displays lyrics for the currently playing song.",
    args: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    permission: [],
    owner: false,
	 execute: async (message, args, client, prefix) => {
    let player = client.manager.players.get(message.guild.id);
     if(!player && !args.length)
    return message.channel.send({embeds: [new MessageEmbed().setColor("#ff0000").setDescription("There Is Nothing Playing")]})

    if(player && !player.queue.current && !args.length)
    return message.channel.send({embeds: [new MessageEmbed().setColor("#ff0000").setDescription("There Is Nothing Playing")]})

     const m = await message.channel.send({
      embeds: [new MessageEmbed().setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor).setDescription(":mag_right: **Searching...**")],
    });
    let search;
    if(args.length)
    search = args.join(' ');
    else if(!args.length)
    search = player.queue.current.title;

    let url2 = `https://api.darrennathanael.com/lyrics?song=${search}`;
    // get the lyrics
   try {
        let lyrics2 = await fetch(url2).then((res) => res.json());
        if (lyrics2.response !== 200) {
          let noLyrics = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
            .setDescription(`
<:cross1:853965073383292970> No lyrics found for \`${search}!\``
            );
          return m.edit({embeds: [noLyrics]});
        } else {
          let embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
            .setTitle(`${lyrics2.full_title}`)
            .setDescription(`\`\`\`nim\n${lyrics2.lyrics.substring(0, 4090)}...\`\`\``);
          return m.edit({ embeds: [embed]});
        }
            let embed = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setTitle(`${lyrics.full_title}`)
        .setDescription(lyrics.lyrics);
      return m.edit({ embeds: [embed]});
    } catch (err) {
      let noLyrics = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setDescription(`
<:cross1:853965073383292970> No lyrics found for \`${search}!\``
        );
      return m.edit({ embeds: [noLyrics]});
    }
   }
}