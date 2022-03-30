const { Discord } = require("discord.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "reconnect",
    category: "Owner",
    description: "",
    args: false,
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
      const em1 = new MessageEmbed();
if (!client.owner.includes(message.author.id)) {
   return;
};
let int = 0;
const guildids = client.guilds.cache.map((r) => r.id);
    
        guildids.forEach(async guildID  => {
    
    const guild = client.guilds.cache.get(guildID)
    if(!guild) return;
  let data = await client.db.get(`247_${guild.id}`);
    if(!data)
    {
      client.db.set(`247_${guild.id}`, `false`);
    }
    else if(data === `false`)
    {
      client.db.delete(`chid_${guild.id}`)
      client.db.delete(`vcid_${guild.id}`)
    }
    else if (data === `true`)
    {
      int+=1;
      const vc = guild.channels.cache.get(await client.db.get(`vcid_${guild.id}`))
            if(!vc)
            {
              client.db.set(`247_${guild.id}`, `false`)
              client.db.delete(`chid_${guild.id}`)
              client.db.delete(`vcid_${guild.id}`)
               return;
            }
            

            const tcid = await client.db.get(`chid_${guild.id}`);
      var player = client.manager.create({
                guild: guild.id,
                voiceChannel: await client.db.get(`vcid_${guild.id}`),
                textChannel: await client.db.get(`chid_${guild.id}`),
                volume: 50,
                selfDeafen: true,
            });
            
            player.connect();
            
            if(vc.type === "stage") {
                try { await client.guilds.cache.get(guildID).me.voice.setSuppressed(false) } catch {/* */}
              }
    }
})

message.channel.send({embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`Successfully Reconnected to voice channels`)]});
    }
}