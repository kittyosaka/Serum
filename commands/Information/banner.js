const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "banner",
    category: "Utility",
    aliases: [ "userbanner" ],
    premium: true,
    description: "To get user banner",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      let user = message.mentions.users.first() || message.author;

      const embed = new MessageEmbed();
      embed.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
       const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
        headers: {
            Authorization: `Bot ${client.token}`
        }
    }).then(d => d.data);
    if(data.banner){
        let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        embed.setImage(`https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`)
        message.channel.send({embeds: [embed]});
    } else {
      embed.setDescription("**User has no Banner**")
        message.channel.send({embeds: [embed]})
    }
    }
}