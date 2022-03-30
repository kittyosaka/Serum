const { MessageEmbed, version, MessageActionRow, MessageButton } = require("discord.js");
const Topgg = require("@top-gg/sdk");
const topgg = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1NTQ3NjQ5MjE0NjU3MzMzMiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI3NTY4NTIwfQ.LYpw-Vue3NxklBxFnHXL7RQRealqFnAbOSRqHMLBdaU");

module.exports = {
    name: "profile",
    category: "Utility",
    description: "Show the user's profile",
    args: false,
    aliases: ["badge", "badges", "achievement", "achievements"],
    usage: "",
    permission: [],
    caching: true,
    owner: false,
    execute: async (message, args, client, prefix) => {
      const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      let voted = await topgg.hasVoted(user.id);
      const aj = user.id === "701643179212013568" ? true : false;
      let badges = "";
      let uprem = await client.db.get(`uprem_${user.id}`)
  let upremend = await client.db.get(`upremend_${user.id}`)
  let count = await client.db.get(`upremcount_${user.id}`)
      const guildd = await client.guilds.fetch("733560404436975638"); 
      const sus = await guildd.members.fetch(user.id).catch((e) => {
      if(uprem || voted ) badges = badges + `\n<a:puser:936480729074925568> **Premium User**`;
      else badges = "`No Badge Available`";
      });
      if(aj === true || user.id === "855476492146573332") badges = badges + `\n<a:own1:936158892772188223> **Creator**`;
try{
      const own = sus.roles.cache.has("856142657260224513");
      if(own === true) badges = badges+`\n<a:owner:936158596650115092> **Owner**`;

      const supp = sus.roles.cache.has("853873312822984704");
      if(supp === true) badges = badges + `\n<a:vip:936159467999985684> **Staff**`;

	  if(uprem || voted) badges = badges + `\n<a:puser:936480729074925568> **Premium User**`;

      const bug = sus.roles.cache.has("936169689816657960");
      if(bug === true) badges = badges + `\n<a:bughunter:936173833797369876> **Bug Hunter**`;

      const supo = sus.roles.cache.has("853879167636209705");
      if(supo === true) badges = badges + `\n<a:supporter:936174212073263124> **Supporter**`;

      const frn = sus.roles.cache.has("909782060229615657");
      if(frn === true) badges = badges + `\n<:friend:936174338313445376> **Close Friend**`;

}catch(err){
if(uprem || voted) {
badges = "";
badges = badges + `\n<a:puser:936480729074925568> **Premium User**`;
}
else if(badges === "") badges = "`No Badge Available`";
}

      const row = new MessageActionRow()
           .addComponents(new MessageButton()
    .setLabel("Premium")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/855476492146573332/vote")
			);
      const embed = new MessageEmbed()
      .setAuthor(`Profile For ${user.username}#${user.discriminator}`, client.user.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
      .setThumbnail(user.displayAvatarURL({dynamic: true}))
      .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
      .addField(`*__Achievements__ <a:achi:936471343757664367>*`, `${badges ? badges : "`No Badge Available`"}`)
      if(!voted && !uprem)
        embed.addField(`*__Premium__ <a:prem:936470381777260545>*`, `You don't have any type of premium! Click [here](https://discord.gg/M2yU2Nzydj) to buy [premium](https://discord.gg/M2yU2Nzydj) or Click [here](https://top.gg/bot/855476492146573332/vote) to vote and get access to [premium](https://top.gg/bot/855476492146573332/vote).`)
      else if(voted || uprem)
        embed.addField(`*__Premium__ <a:prem:936470381777260545>*`, !uprem ? `You have voted, so you have access to premium features untill next vote is available` : `Premium Count: \`${count ? count : 0}\`\nPremium Ends: <t:${Math.round(upremend / 1000)}> (<t:${Math.round(upremend / 1000)}:R>)`)
.setTimestamp();
      message.channel.send({embeds: [embed], components: [row]})
    }
}