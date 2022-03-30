const { prefix } = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client) => {
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
      const vc = guild.channels.cache.get(await client.db.get(`vcid_${guild.id}`))
            if(!vc)
            {
              client.db.set(`247_${guild.id}`, `false`)
              client.db.delete(`chid_${guild.id}`)
              client.db.delete(`vcid_${guild.id}`)
               return;
            }
            const vcperm = vc.permissionsFor(client.user).has(Discord.Permissions.FLAGS.CONNECT)
            if(!vcperm) return;

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
    client.manager.init(client.user.id);
    console.log(`${client.user.username} online! `, "ready ");
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    //Game
    let statuses = ['/play', `+play`];
    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: "LISTENING"});
  	}, 10000)

}