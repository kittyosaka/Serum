const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Info",
    aliases: [ "addme", "links", "inv"],
    description: "Shows Serum's official invite links!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Serum")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=855476492146573332&permissions=8&scope=bot%20applications.commands`),
    new MessageButton()
    .setLabel("Serum 2")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=825654548689321984&permissions=8&scope=bot`),
    new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL("https://discord.gg/M2yU2Nzydj")
			);

          const mainPage = new MessageEmbed()
            .setTitle("Invite Links For Serums!")
             .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
            .addField('Serum', `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=855476492146573332&permissions=8&scope=bot%20applications.commands)`, true)
            .addField('Serum 2', `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=825654548689321984&permissions=8&scope=bot)`, true)
            .addField('Support Server', `[Click Here](https://discord.gg/M2yU2Nzydj)`)
           message.channel.send({embeds: [mainPage], components: [row]})
    }
}