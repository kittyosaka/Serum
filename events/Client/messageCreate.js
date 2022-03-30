const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");
const Topgg = require("@top-gg/sdk");
const topgg = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1NTQ3NjQ5MjE0NjU3MzMzMiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI3NTY4NTIwfQ.LYpw-Vue3NxklBxFnHXL7RQRealqFnAbOSRqHMLBdaU");

module.exports = async (client, message) => {
   
   if (message.author.bot) return;
   if (!message.guild) return;
   const premrow = new MessageActionRow()
     .addComponents(new MessageButton()
     .setLabel("Premium")
     .setStyle("LINK")
     .setURL("https://discord.gg/M2yU2Nzydj"));
  
   let uprem = await client.db.get(`uprem_${message.author.id}`);
  
  let upremend = await client.db.get(`upremend_${message.author.id}`);
//user premiums scopes ^^

  let sprem = await client.db.get(`sprem_${message.guild.id}`);

  let spremend = await client.db.get(`spremend_${message.guild.id}`);

//server premium scopes ^^
  let scot = 0;
  let slink = "https://discord.gg/M2yU2Nzydj";
  if(upremend && Date.now() >= upremend) 
  {
    let upremcount = await client.db.get(`upremcount_${message.author.id}`) ? await client.db.get(`upremcount_${message.author.id}`) : 0;

  let upremserver = await client.db.get(`upremserver_${message.author.id}`) ? await client.db.get(`upremserver_${message.author.id}`) : [];

  let spremown = await client.db.get(`spremown_${message.guild.id}`);
    
   await client.db.delete(`upremcount_${message.author.id}`)
    await client.db.delete(`uprem_${message.author.id}`)
    await client.db.delete(`upremend_${message.author.id}`)
    if(upremserver.length > 0){
      for(let i = 0; i < upremserver.length; i++){
        scot += 1;
        await client.db.delete(`sprem_${upremserver[i]}`)
        await client.db.delete(`spremend_${upremserver[i]}`)
        await client.db.delete(`spremown_${upremserver[i]}`)
      }
    }
   await client.db.delete(`upremserver_${message.author.id}`)
    message.author.send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`Your Premium Has Got Expired.\nTotal **\`${scot}\`** Servers [Premium](https://discord.gg/M2yU2Nzydj) was removed.\nClick [here](https://discord.gg/M2yU2Nzydj) To Buy [Premium](https://discord.gg/M2yU2Nzydj).`)], components: [premrow]}).catch((err) => { });
  }

  if(spremend && Date.now() >= spremend)
  { 
    let scount = 0;
    
    let us = await client.db.get(`spremown_${message.guild.id}`);
    
    let upremserver = await client.db.get(`upremserver_${us}`) ? await client.db.get(`upremserver_${us}`) : [];
    
    let upremcount = await client.db.get(`upremcount_${us}`) ? await client.db.get(`upremcount_${us}`) : 0;
    
    let spremown = await client.db.get(`spremown_${message.guild.id}`).then(r => client.db.get(`upremend_${r}`));
    
    await client.db.delete(`sprem_${message.guild.id}`)
    await client.db.delete(`spremend_${message.guild.id}`)
    
    if(spremown && Date.now() > spremown){
      await client.db.delete(`upremcount_${us}`)
      await client.db.delete(`uprem_${us}`)
      await client.db.delete(`upremend_${us}`)
      
      for(let i = 0; i < upremserver.length; i++){
        scount += 1;
        await client.db.delete(`sprem_${upremserver[i]}`)
        await client.db.delete(`spremend_${upremserver[i]}`)
        await client.db.delete(`spremown_${upremserver[i]}`)
      }
    try{
    await client.users.cache.get(`${us}`).send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`Your Premium Has Got Expired.\nTotal **\`${scount}\`** Servers [Premium](https://discord.gg/M2yU2Nzydj) was removed.\nClick [here](https://discord.gg/M2yU2Nzydj) To Buy [Premium](https://discord.gg/M2yU2Nzydj).`)], components: [premrow]}).catch((er) => { })
    }catch(errors) {
      
    }
    }
    await client.db.delete(`upremserver_${us}`)
    await client.db.delete(`spremown_${message.guild.id}`)
    message.channel.send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`The Premium Of This Server Has Got Expired.\nClick [here](https://discord.gg/M2yU2Nzydj) To Buy [Premium](https://discord.gg/M2yU2Nzydj).`)], components: [premrow]}).catch((err) => { });
  
  }

   let prefix = await client.db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = client.prefix;
      
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
var m = "";
try{
var p1 = message.client.manager.get(message.guild.id);
if(!p1) m = "null";
else {
const ch = message.guild.channels.cache.get(p1.voiceChannel);
m = ch.rtcRegion;
}
}catch(e) {

}
    if (message.content.match(mention)) {
      const row = new MessageActionRow()
           .addComponents(
        new MessageButton()
    .setLabel("Invite Me")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
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
        .setTitle(`Settingss For ${message.guild.name}`)
        .setFooter(`Developed with ❤️ By - A. J.#8366`, message.guild.iconURL({dynamic: true}))
        .setDescription(`My prefix here is \`${prefix}\`\nVoice Region: \`${m}\`\nServer Id: \`${message.guild.id}\`\n\nYou can play music by joining a voice channel and typing \`${prefix}play\`.\nType \`${prefix}help\` To Get All Commands Help Menu.`);
      message.channel.send({embeds: [embed], components: [row]}).catch((error) => {
  return message.author.send({embeds: [new MessageEmbed().setColor('#ff0000').setDescription(`**I do not have required permissions in that channel!**`)]}).catch((err) => {
     });
   });
};

let datab = ['701643179212013568', '921100377565302785', '558400760245911582'];

const mentionRegex = RegExp(`^<@!?${client.user.id}>$`); const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`)

const prefix1 = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;
    
 if(!datab.includes(message.author.id)){
                if (!message.content.startsWith(prefix1)) return;
            } 


    const args = datab.includes(message.author.id) == false ? message.content.slice(prefix1.length).trim().split(/ +/) :  message.content.startsWith(prefix1) == true ? message.content.slice(prefix1.length).trim().split(/ +/) : message.content.trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if(!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.SEND_MESSAGES))
return message.author.send({embeds: [new MessageEmbed().setColor('#ff0000').setDescription(`**I do not have permission to \`Send Messages\` in that channel!**`)]}).catch((error) => {

});

if (!message.guild.me.permissionsIn(message.channel).has([Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.USE_EXTERNAL_EMOJIS]))
return message.channel.send(`I require the permissions: \`Read Message History\`, \`Embed links\`, \`Use external emojis\`, \`Add reactions\`.\n\nMake sure to check all the other roles I have for that permission and remember to check channel-specific permissions.
Thank you.`);
    
    const embed = new MessageEmbed()
        .setColor("#ff1010");

    // args: true,

    if(command.premium)
   {
     let voted = await topgg.hasVoted(message.author.id);
    if(!'701643179212013568'.includes(message.author.id)  && !voted && !uprem && !sprem){
    const row = new MessageActionRow()
    .addComponents(new MessageButton()
    .setLabel("Vote Me")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/855476492146573332/vote"), 
    new MessageButton()
    .setLabel("Premium")
    .setStyle("LINK")
    .setURL("https://discord.gg/M2yU2Nzydj")
			);
      embed.setDescription("You must [vote](https://top.gg/bot/855476492146573332/vote) me to use this command. If you want to disable this then [click here](https://discord.gg/M2yU2Nzydj) to buy [premium](https://discord.gg/M2yU2Nzydj) to listen interruption free **music**!")
      .setColor("#f6ff00")
    return message.channel.send({embeds: [embed], components: [row]})
    }
  }
    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
        embed.setDescription(`You should 1st play a song to use this command`);
        return message.channel.send({embeds: [embed]});
    }

    if (command.inVoiceChannel && !message.member.voice.channel) {
        embed.setDescription("You Must Be **Connected** To A Voice Channel First");
        return message.channel.send({embeds: [embed]});
    }

    if (command.sameVoiceChannel && message.member.voice.channel !== message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel)
      {
        embed.setDescription(`You Must Be **Connected** In ${message.guild.me.voice.channel} To Use This Command`);
        return message.channel.send({embeds: [embed]});
      }
    }

  
        if (command.args && !args.length) {
        let reply = ``;
        // usage: '',
        if (command.usage) {
        	 reply += `${prefix}${command.name} \`${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.channel.send({embeds: [embed]});
    }

    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
        return message.channel.send({embeds: [embed]});
    }
  }
