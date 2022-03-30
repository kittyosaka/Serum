const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
	name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Shows details of current playing track.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: false,
	 execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
          const emb = new MessageEmbed()
          emb.setDescription(`There Is Nothing Playing...`)
          emb.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
            return message.channel.send({embeds: [emb]});
        }

        const song = player.queue.current

        const emojimusic = message.client.emoji.music;

        // Progress Bar
        var total = song.duration;
        var current = player.position;
        var size = 18;
        var emp = `<:fill:937406279582900334>`;
        var line = '<:empty:937411566041718784>';
        var slider = '<:bar:937406677752348723>';
        
         let tr = song.title;
  let result = tr.substring(0, 63);
        let embed = new MessageEmbed()
        .setTitle("Now Playing")
            .setDescription(`[${result}...](${song.uri})[<@${song.requester.id}>] \n${progressbar(player, total, current, size, emp, line, slider)} ${convertTime(current)}/${convertTime(total)}`)
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
         return message.channel.send({embeds: [embed]})
            
    }
};
function progressbar (player, total, current, size, emp, line, slider) {
       if (current > total) {
            const bar = line.repeat(size + 2);
            return bar;
        }
            const percentage = current / total;
            const progress = Math.round((size * percentage));
            const emptyProgress = size - progress;
            const progressText = emp.repeat(progress).replace(/.$/, `>`+slider);
            const emptyProgressText = line.repeat(emptyProgress);
            const bar = progressText + emptyProgressText;
            if (!String(bar).includes("<:bar:937406677752348723>"))
            return `<:bar:937406677752348723>${line.repeat(size - 1)}`;
            return bar;
        
    }