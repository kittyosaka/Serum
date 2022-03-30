const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "grab",
    aliases: ["save"],
    category: "Music",
    description: "Grabs And Sends You The Song That Is Playing At The Moment",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
            .setColor("#FFC942")
            .setDescription("> There is no music playing.");
            return message.channel.send({embeds: [thing]});
        }

        const song = player.queue.current
        const total = song.duration;
        const current = player.position;
        let i = 1;
        
       const dmbut = new MessageButton().setLabel("Check Your Dm").setStyle("LINK").setURL(`https://discord.com/users/${client.id}`)
        const row = new MessageActionRow().addComponents(dmbut)

        let dm = new MessageEmbed()
        .setDescription(`<:Success:853965334297444393> Successfully **Grabbed** the current song in your **Direct Messages**.`)
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
 

        const urlbutt = new MessageButton().setLabel("Search").setStyle("LINK").setURL(song.uri)
        const row2 = new MessageActionRow().addComponents(urlbutt)
        let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription(`**[${song.title}](${song.uri})**`)
            .addField(`**Song Author:**`,`${song.author}`)
            .addField(`**Duration:**`, `\`${convertTime(total)}\``)
            .addField(`**Requested By:**`, `<@${song.requester.id}>`)
            .addField(`**Replay It:**`, `\`${prefix}play ${song.uri}\``)
            .addField(`**Saved In:**`, `<#${message.channel.id}>`)
            .setThumbnail(song.displayThumbnail())
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
            
         message.author.send({embeds: [embed], components: [row2]}).then(() => message.channel.send({embeds: [dm], components: [row]})).catch((error) => {
           message.channel.send({embeds: [new MessageEmbed().setColor(`#ff0000`).setDescription(`Your \`Direct Messages\` is **OFF**, turn it on and try again!`)]})
});
    
        
    }
};