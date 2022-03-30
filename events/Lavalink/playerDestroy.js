const { MessageEmbed, WebhookClient } = require('discord.js');
const { Webhooks: {player_delete} } = require('../../config.json');
module.exports = async (client, player) => {
    try {
    {
        if(player.get('nowplayingMSG').deletable){

           await player.get('nowplayingMSG').delete();
    }
    }
    }catch(err)  { 
    
  }
try{
const web1 = new WebhookClient({ url: player_delete }); 

const server = client.guilds.cache.get(player.guild);

const embed = new MessageEmbed().setColor("#ff1010").setAuthor("Player Destroyed", client.user.displayAvatarURL()).setDescription(`Id: **${player.guild}**\nName: **${server.name}**`)

web1.send({embeds: [embed]})
}catch (err){
}
}
