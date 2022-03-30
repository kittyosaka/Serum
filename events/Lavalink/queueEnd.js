const delay = require("delay");
const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = async (client, player, track, playload) => {
try {
    {
        if(player.get('nowplayingMSG').deletable){

           await player.get('nowplayingMSG').delete();
    }
    }
    }catch(err)  { 
    
  }

    let autoplay = await client.db.get(`auto_${player.guild}`);
    if (autoplay === `true`) {
      
            const previoustrack = player.get("previoustrack");
    if (!previoustrack) return;
        const requester = previoustrack.requester;
        const oldidentifier = player.get("identifier");
        const search = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
        player.set("requester", client.user)
        response = await player.search(search, client.user);
		player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);



    const channel = client.channels.cache.get(player.textChannel);
    player.play();
    }

}
