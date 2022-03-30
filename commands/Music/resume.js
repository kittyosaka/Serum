const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "resume",
    aliases: ["r"],
    category: "Music",
    description: "Resumes the current paused song.",
    args: false,
    usage: "<Number of song in queue>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);
    const song = player.queue.current;

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
        }

        const emojiresume = message.client.emoji.resume;

        if (!player.paused) {
            let thing = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`<:resume:954002251511386153> The player is already **resumed**.`)
                .setTimestamp()
          return message.channel.send({embeds: [thing]});
        }

        player.pause(false);

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
    player.get('nowplayingMSG').edit({components: [row, row1]})
}catch(e) {
}
        
        return message.react("▶️");
	
    }
};