const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "shard-own",
    category: "Owner",
    description: "Total Shard Stats",
    args: false,
    usage: ``,
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
      if (!client.owner.includes(message.author.id)) {
      return ;
};
      let m = message.guild.shardId;
      let us = 0;
      let ser = 0;
      let ch = 0;
      let pin = 0;
      let ram = 0;
      let ping = 0;
      let play = 0;
      let c = 0;
        client.shard.broadcastEval(client => [
            client.shard.ids,
            client.guilds.cache.size,
            client.channels.cache.size,
            client.guilds.cache.filter((guild) => guild.available).reduce((prev, guild) => prev + guild.memberCount, 0),
            (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
            client.manager.players.size,
            client.ws.ping,
            client.uptime])
        .then((results) =>{
            const embed = new MessageEmbed()
                .setAuthor(`Serum Shards`, client.user.displayAvatarURL())
                .setColor('#2F3136')
                .setTimestamp()
                .setDescription(`This server is currentyly on shard **${message.guild.shardId}**`);

            results.map((data) => {
              c += 1
              ser += data[1]
              ch += data[2]
              us += data[3]
              ram += parseInt(data[4])
              play += data[5]
              ping += data[6]
                embed.addField(`<:online:937598229149786112> Shard ${data[0]}`,
                 `\`\`\`js\nServers: ${data[1]}\nChannels: ${data[2]}\nUsers: ${data[3]}\nRAM: ${data[4]}MB\nPlayers: ${data[5]}\nPing: ${data[6]}ms\nUptime: ${moment.duration(data[7]).format("D[d] H[h] m[m] s[s]")}\`\`\``, true)
            });
            ping = Math.round(ping/c);
            embed.addField(`Total Stats`, `\`\`\`js\nTotal Servers: ${ser}\nTotal Channels: ${ch}\nTotal Users: ${us}\nTotal Ram: ${ram}\nTotal Player: ${play}\nTotal Avg Ping: ${ping}ms\`\`\``)
            message.channel.send({ embeds: [embed] });
        })
        .catch((error) => {
            console.error(error);
            message.reply(`❌ Error.`);
        });
    }
}