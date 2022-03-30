const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");

module.exports = {
    name: "vote",
    category: "Info",
    description: "Get a link to vote me!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
     
      const row = new MessageActionRow()
           .addComponents(new MessageButton()
    .setLabel("Vote Me")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/855476492146573332/vote")
			);
      const embed = new MessageEmbed()
      .setDescription("[Click here](https://top.gg/bot/855476492146573332/vote) to vote for Serum.")
      .setColor("#ff1010")
      return message.reply({
                    embeds: [embed], components: [row]})
    }
}