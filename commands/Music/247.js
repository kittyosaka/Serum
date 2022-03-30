const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
module.exports = {
  name: "247",
  aliases: ["24h", "24/7", "24*7"],
  premium: true,
  category: "Settings",
  description: "Toggles 24/7 mode in the server.",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {

      if (!message.member.permissions.has('MANAGE_GUILD') && !'701643179212013568'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#FF0000").setDescription('You must have `Manage Guild` permission to use this command.')]});
  let data = await client.db.get(`247_${message.guild.id}`);
  if(!data)
  {
    client.db.set(`247_${message.guild.id}`, `false`)
  }
  const { channel } = message.member.voice;
    const player = message.client.manager.players.get(message.guild.id);
    if (data === `true`) {
      client.db.set(`247_${message.guild.id}`, `false`);
      client.db.delete(`vcid_${message.guild.id}`);
      client.db.delete(`chid${message.guild.id}`);
      const embed = new MessageEmbed()
       .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
       .setDescription(`24/7 mode is now **disabled**.`)
      return message.channel.send({embeds: [embed]});
    
    }
    else if(data === `false`)
    {
      client.db.set(`247_${message.guild.id}`, `true`);
      client.db.set(`vcid_${message.guild.id}`, channel.id);
      client.db.set(`chid_${message.guild.id}`, message.channel.id);
      const embed = new MessageEmbed()
       .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
       .setDescription(`24/7 mode is now **enabled**.`)
      
      return message.channel.send({embeds: [embed]});
    }
  }
};