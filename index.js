const { Client, WebhookClient, Collection, Intents, MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const  { bot_token, Webhooks: {bot_error} } = require('./config.json'); 
const { Database } = require("quickmongo");
const { readdirSync } = require("fs");
const client = new Client({
   intents: [Intents.FLAGS.GUILDS, Intents.
FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]

});


client.on('interactionCreate', async interaction => {
    if(interaction.isButton())
  {
    
    if(interaction.customId === 'DELETE_BUT')
    {
    const em = new MessageEmbed()
    .setDescription(`Only Bot Owner Can Use This Button`)
    .setColor(`#ff0000`)

    if(interaction.user.id === '709169539249864775')
    return interaction.message.delete();
    else
    return interaction.reply({embeds: [em], ephemeral: true});
    }
  }
    if (!interaction.isSelectMenu()) return;
    
    let options = interaction.values;
    const funny = options[0];
    let _commands;
    const embed = new MessageEmbed()
    .setThumbnail(interaction.guild.iconURL({dynamic: true}))
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setColor(interaction.guild.me.displayHexColor !== '#000000' ? interaction.guild.me.displayHexColor : client.config.embedColor)

if(funny === 'first') {
 _commands = client.commands.filter((x) => x.category && x.category === "Filter").map((x) => `\`${x.name}\``);
        embed.addField(`**Filter \`[${_commands.length}]\`**`, _commands.sort().join(", "))
        interaction.reply({ embeds: [embed], ephemeral: true })
        return
    }
if(funny === 'second') {
  _commands = client.commands.filter((x) => x.category && x.category === "Info").map((x) => `\`${x.name}\``);
        embed.addField(`**Info \`[${_commands.length}]\`**`,  _commands.sort().join(", "))
        interaction.reply({ embeds: [embed], ephemeral: true })
        return
    }
if(funny === 'third') {
  _commands = client.commands.filter((x) => x.category && x.category === "Utility").map((x) => `\`${x.name}\``);
      embed.addField(`**Utilities \`[${_commands.length}]\`**`,  _commands.sort().join(", "))
        interaction.reply({ embeds: [embed], ephemeral: true })
        return
    }
if(funny === 'fourth') {
  _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
        embed.addField(`**Music \`[${_commands.length}]\`**`,  _commands.sort().join(", "))
         interaction.reply({ embeds: [embed], ephemeral: true })
        return
    }
if(funny === 'fifth') {
 _commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``);
        embed.addField(`**Playlist \`[${_commands.length}]\`**`, _commands.sort().join(", "))
        interaction.reply({ embeds: [embed], ephemeral: true })
        return
    }
if (funny === 'sixth') {
  _commands = client.commands.filter((x) => x.category && x.category === "Settings").map((x) => `\`${x.name}\``);
        embed.addField(`**Settings \`[${_commands.length}]\`**`, _commands.sort().join(", "))
        interaction.reply({ embeds: [embed], ephemeral: true })
        return
    }
if (funny === 'seventh') {
 _commands = client.commands.filter((x) => x.category && x.category === "Filter").map((x) => `\`${x.name}\``);
        embed.addField(`**Filter \`[${_commands.length}]\`**`, _commands.sort().join(", "))

  _commands = client.commands.filter((x) => x.category && x.category === "Info").map((x) => `\`${x.name}\``);
        embed.addField(`**Info \`[${_commands.length}]\`**`,  _commands.sort().join(", "))

  _commands = client.commands.filter((x) => x.category && x.category === "Utility").map((x) => `\`${x.name}\``);
      embed.addField(`**Utilities \`[${_commands.length}]\`**`,  _commands.sort().join(", "))

  _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
        embed.addField(`**Music \`[${_commands.length}]\`**`,  _commands.sort().join(", "))

  _commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``);
      embed.addField(`**Playlist \`[${_commands.length}]\`**`,  _commands.sort().join(", "))

  _commands = client.commands.filter((x) => x.category && x.category === "Settings").map((x) => `\`${x.name}\``);
        embed.addField(`**Settings \`[${_commands.length}]\`**`, _commands.sort().join(", "))

  embed.setFooter(`Total Commands: ${client.commands.filter((x) => x.category && x.category !== "Owner").map((x) => `\`${x.name}\``).length}`)

  interaction.reply({ embeds: [embed], ephemeral: true })
        return
}slashCommands
})
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.db = new Database(client.config.mongourl);
client.owner = client.config.ownerID;
client.prefix = client.config.prefix;
client.aliases = new Collection();
client.commands = new Collection();
client.categories = readdirSync("./commands/");
client.logger = require("./utils/logger.js");
client.emoji = require("./utils/emoji.json");

require("./handler/Client")(client);

client.login(bot_token);

const web = new WebhookClient({ url: bot_error }); 

process.on('unhandledRejection', (error) => {
  web.send(`\`\`\`js\n${error}\`\`\``)
});


