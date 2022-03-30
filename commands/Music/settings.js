const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "settings",
    category: "Settings",
    description: "Shows the server settings.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      if (!message.member.permissions.has('MANAGE_GUILD') && !'701643179212013568'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#FF0000").setDescription('You must have `Manage Guild` permission to use this command.')]});
      let vc;
      let ap = await client.db.get(`auto_${message.guild.id}`)
      let tw = await client.db.get(`247_${message.guild.id}`)
      if(tw === "true") vc = await client.db.get(`vcid_${message.guild.id}`)
      const embed = new MessageEmbed()
      .setAuthor(`${client.user.username} Settings`, client.user.displayAvatarURL(), "https://discord.gg/M2yU2Nzydj")
      .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
      .setDescription(`**<:prefix:935879122557734922> Prefix** ${prefix}`)
      .addField(`<a:infinity:935884143449997332> 24/7`, tw === `true` ? "<:not_provided:935882190514978826><:not_provided2:935882118628773898>" : "<:not_provided2:935882076828364820><:not_provided:935882083795083274>")
      if(tw === `true`){
      embed.addField(`<:stagechannelon:935885872878989312> 24/7 VC`, `<#${vc}>`)
    }
      embed.addField(`<:autoplayy:935880365397143602> Autoplay`, ap === `true` ? "<:not_provided:935882190514978826><:not_provided2:935882118628773898>" : "<:not_provided2:935882076828364820><:not_provided:935882083795083274>")
      message.channel.send({embeds: [embed]})
    }
}
