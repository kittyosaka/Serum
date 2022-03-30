const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "about",
    category: "Info",
    aliases: [ "botinfo" ],
    description: "To get information about this bot!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
     
          const row = new MessageActionRow()
           .addComponents(
        new MessageButton()
    .setLabel("Invite Me")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL("https://discord.gg/M2yU2Nzydj"),
    new MessageButton()
    .setLabel("Vote Me")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/855476492146573332/vote")
			);
      const embed = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setAuthor(`About ${client.user.username}`, client.user.displayAvatarURL(), "https://discord.gg/M2yU2Nzydj")
        
        .setDescription(`Hey, I'm **${client.user.username}**. My work is to play **Music**. You can view all my commands by typing \`${prefix}help\`.`)
        .addField(`**Owner**`, `[- A. J.#8366](https://discord.com/users/701643179212013568)`)
      message.channel.send({embeds: [embed], components: [row]})
    }
}