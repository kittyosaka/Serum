const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
    
module.exports = async (client, player, track, payload) => {
   player.set(`previoustrack`, track);
  const emojiplay = client.emoji.play;
  let tr = track.title;
  let result = tr.substring(0, 63);
   const channel = client.channels.cache.get(player.textChannel);
if(!channel.guild.me.permissionsIn(channel).has('VIEW_CHANNEL')) return player.destroy();
  const song = player.queue.current
  var total = song.duration;
  const thing = new MessageEmbed()
        .setAuthor("Now Playing", client.user.displayAvatarURL(), "https://discord.gg/M2yU2Nzydj")
        .setDescription(`<a:np1:896619873113899028> [${result}](${track.uri})`)
        .addField("<a:Duration:933594916465045514> Duration", `${convertTime(total)}`, true)
        .addField("<a:requester:933594649845694465> Requester", `<@${track.requester.id}>`, true)
        .setColor(channel.guild.me.displayHexColor !== '#000000' ? channel.guild.me.displayHexColor : client.config.embedColor)
   const But1 = new MessageButton().setCustomId("vdown").setEmoji("<:voldown:954002251846918174>").setStyle("SECONDARY");
    
   const But2 = new MessageButton().setCustomId("rewind").setEmoji("<:rewind:954002251633025094>").setStyle("SECONDARY"); 

   const But3 = new MessageButton().setCustomId("pause").setEmoji("<:pause:954002251024830506>").setStyle("SECONDARY");

   const But4 = new MessageButton().setCustomId("forward").setEmoji("<:forward:954002139636727818>").setStyle("SECONDARY");
    
   const But5 = new MessageButton().setCustomId("vup").setEmoji("<:volup:954002251469434940>").setStyle("SECONDARY");

   const But6 = new MessageButton().setCustomId("back").setEmoji("<:back:954002108372353104>").setStyle("SECONDARY");

   const But7 = new MessageButton().setCustomId("right").setEmoji("<a:leftwing:954008780402753596>").setStyle("SECONDARY").setDisabled(true);

   const But8 = new MessageButton().setCustomId("stop").setEmoji("<:stop:954002253843427388>").setStyle("DANGER");

   const But9 = new MessageButton().setCustomId("left").setEmoji("<a:rightwing:954008786488655932>").setStyle("SECONDARY").setDisabled(true);

   const But10 = new MessageButton().setCustomId("skip").setEmoji("<:skip:954002184440254484>").setStyle("SECONDARY");
   
   const row = new MessageActionRow().addComponents(But1, But2, But3, But4, But5);
   const row1 = new MessageActionRow().addComponents(But6, But7, But8, But9, But10)
   try{
  let NowPlaying = await client.channels.cache
    .get(player.textChannel)
    .send({ embeds: [thing], components: [row, row1] });
  player.set("nowplayingMSG", NowPlaying);
   }catch(err) {
}

        
}