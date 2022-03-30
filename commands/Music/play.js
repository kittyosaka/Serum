const { Util, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p"],
    description: "Plays a song with the given name or url.",
    usage: "<url | Song Name>",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    args: true,
   execute: async (message, args, client, prefix) => {
  
          const em1 = new MessageEmbed()
        const { channel } = message.member.voice;
        var player = message.client.manager.get(message.guild.id);
        if (!player) {
            var player = message.client.manager.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                volume: 50,
                selfDeafen: true,
            });
        }
        if (player.state !== "CONNECTED") player.connect();
        player.setTextChannel(message.channel.id);
        const emojiaddsong = message.client.emoji.addsong;
        const emojiplaylist = message.client.emoji.playlist;

       let SearchString = args.join(" ");
        if (SearchString.match(client.Lavasfy.spotifyPattern)) {
        await client.Lavasfy.requestToken();
        let node = client.Lavasfy.nodes.get("main");
        let Searched = await node.load(SearchString);
      if (Searched.loadType === "PLAYLIST_LOADED") {
          let songs = [];
         for (let i = 0; i < Searched.tracks.length; i++){
            songs.push(TrackUtils.build(Searched.tracks[i], message.author));
         }
          player.queue.add(songs);
          if (!player.playing && !player.paused) 
          player.play();
         const thing = new MessageEmbed()
             .setAuthor('Added Playlist To Queue', message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
             .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
             .setDescription(`<a:queue:896619906466979860> **${Searched.tracks.length}** Tracks From **${Searched.playlistInfo.name}**\n\n**Requester: **<@${message.author.id}> | **Duration: **\`❯ ${convertTime(Searched.tracks.reduce((acc, cure) => acc + cure.info.length, 0))}\``)
          return message.channel.send({embeds: [thing]});
     } else if (Searched.loadType.startsWith("TRACK")) {
          player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));
          if (!player.playing && !player.paused) 
          return player.play();
            const thing = new MessageEmbed()
            .setAuthor('Added Song To Queue', message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
             .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
             .setDescription(`<a:queue:896619906466979860> [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})\n\n**Requester: **<@${message.author.id}> | **Duration: **\`❯ ${convertTime(Searched.tracks[0].info.length)}\``)
         return message.channel.send({embeds: [thing]});
           } else {
         return message.channel.send({ embeds: [new MessageEmbed().setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor).setDescription('There were no results found.')]});
        }
      }
else {
        const search = args.join(' ');
        let res;

        try {
            res = await player.search(search, message.author);
            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw res.exception;
            }
        } catch (err) {
            return message.channel.send({embeds: [new MessageEmbed().setColor("#ff0000").setDescription(`There were no results found..`)]});
        }

        switch (res.loadType) {
            case 'NO_MATCHES':
                if (!player.queue.current) player.destroy();
                return message.channel.send({embeds: [new MessageEmbed().setColor("#ff0000").setDescription(`There were no results found..`)]});
            case 'TRACK_LOADED':
                var track = res.tracks[0];
                player.queue.add(track);
          if (!player.playing && !player.paused) 
             return player.play(); 
          else {
                    var thing = new MessageEmbed()
                        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
                        .setAuthor('Added Song To Queue', message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
                        .setDescription(`<a:queue:896619906466979860> [${track.title.substring(0, 63)}](${track.uri})\n\n**Requester: **<@${track.requester.id}> | **Duration: **\`❯ ${convertTime(track.duration)}\``)
                    return message.channel.send({embeds: [thing]})
                }
            case 'PLAYLIST_LOADED':
                player.queue.add(res.tracks);
          if (!player.playing && !player.paused) 
              player.play();
                var thing = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
                    .setAuthor('Added Playlist To Queue', message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
                    .setDescription(`<a:queue:896619906466979860> ${res.tracks.length} Songs **${res.playlist.name}**\n\n**Requester: **<@${message.author.id}> | **Duration: **\`❯ ${convertTime(res.playlist.duration)}\``)
                return message.channel.send({embeds: [thing]})
            case 'SEARCH_RESULT':
                var track = res.tracks[0];
                player.queue.add(track);
            if (!player.playing && !player.paused) 
                   return player.play(); 
            else {
                    var thing = new MessageEmbed()
                        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
                        .setAuthor('Added Song To Queue', message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
                        .setDescription(`<a:queue:896619906466979860> [${track.title.substring(0, 63)}](${track.uri})\n\n**Requester: **<@${track.requester.id}> | **Duration: **\`❯ ${convertTime(track.duration)}\``)
                        
                    return message.channel.send({embeds: [thing]})
                }
        }
   }
    }
}