const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports.format = format;
module.exports.swap_pages2 = swap_pages2;

function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

async function swap_pages2(client, message, embeds) {
  let currentPage = 0;
  const { MessageButton, MessageActionRow } = require("discord.js");
 
  
 


  let buttonrow1 = new MessageActionRow()
  .addComponents(
     new MessageButton()
  .setStyle('SUCCESS')
  .setLabel('FIRST')
  .setCustomId('first'),
 new MessageButton()
  .setStyle('PRIMARY')
  .setLabel('BACK')
  .setCustomId('back'),

  new MessageButton()
  .setStyle('PRIMARY')
  .setLabel('NEXT')
  .setCustomId('next'),
  new MessageButton()
  .setStyle('SUCCESS')
  .setLabel('LAST')
  .setCustomId('last')
			);

  


  if (embeds.length === 1) return message.channel.send({embeds: [embeds[0]]})
  const queueEmbed = await message.channel.send(
    {
      content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      components: [buttonrow1],
      embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)]
    }
  );

  

  const collector = message.channel.createMessageComponentCollector({ 
                        filter: interaction => (interaction.isButton() || interaction.isSelectMenu())})

  collector.on("collect", async (interaction) => {
if (!interaction.deferred) await interaction.deferUpdate().catch(() => { });   
if(interaction.customId == "next"){
  if (currentPage < embeds.length - 1) {
          currentPage++;
         await queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)], components: [buttonrow1]});
        } else {
          currentPage = 0
         await queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)], components: [buttonrow1]});
        }
} else if(interaction.customId == "back"){

  if (currentPage !== 0) {
          --currentPage; 
         await queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)], components: [buttonrow1]});
        } else {
          currentPage = embeds.length - 1
        await queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)], components: [buttonrow1]});
        }
} else if(interaction.customId == "first"){

  currentPage = 0;
      await  queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)], components: [buttonrow1]});
       await queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)], components: [buttonrow1]});
       await queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)], components: [buttonrow1]});
        
} else if(interaction.customId == "last"){

  currentPage = embeds.length - 1;
      await  queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage].setFooter(`Current Page - ${currentPage + 1}/${embeds.length}`)], components: [buttonrow1]});
    
        
}


    })
                        
                    
    
}