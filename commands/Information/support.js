const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");

module.exports = {
 name: "support",
    category: "Info",
    aliases: [ "server" ],
    description: "To get Support server link or report a issue (bug)!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      const row = new MessageActionRow()
           .addComponents(new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL("https://discord.gg/M2yU2Nzydj")
           );
           const embed = new MessageEmbed()
      .setDescription("[Click here](https://discord.gg/M2yU2Nzydj) to join our support server.")
      .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
      return message.reply({
                    embeds: [embed], components: [row]})
    }
}