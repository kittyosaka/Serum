var {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require("discord.js")
const { TrackUtils, Player } = require("erela.js");
const { convertTime } = require("../../utils/convert");

module.exports = {
    name: "search",
    description: "search for a song from youtube",
    category: "Music",
    aliases: ["sc"],
    usage: [`<Song Name>`],
    args: true,
    Permissions: [],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
   execute: async (message, args, client) => { 

    const { channel } = message.member.voice;
    if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({embeds: [new MessageEmbed().setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor).setDescription(`I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`)]});

    let player = message.client.manager.get(message.guildId);
    if(!player)
     player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        volume: 50,
        selfDeafen: true,
      }) 
      if(player && player.state !== "CONNECTED") player.connect();

       let SearchString = args.join(" ");
        if (SearchString.match(client.Lavasfy.spotifyPattern)) {
        await client.Lavasfy.requestToken();
        let node = client.Lavasfy.nodes.get("main");
        let Searched = await node.load(SearchString);
      if (Searched.loadType === "PLAYLIST_LOADED") {
          let songs = [];
         for (let i = 0; i < Searched.tracks.length; i++)
            songs.push(TrackUtils.build(Searched.tracks[i], message.author));
          player.queue.add(songs);
          if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length)
           player.play();
         const thing = new MessageEmbed()
             .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
             .setDescription(`<a:queue:896619906466979860> **Added Playlist to queue**\n**${Searched.tracks.length}** Tracks From **${Searched.playlistInfo.name}**`)
          return message.channel.send({embeds: [thing]});
     } else if (Searched.loadType.startsWith("TRACK")) {
          player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));
       if (!player.playing && !player.paused && !player.queue.size)
            return player.play();
            const thing = new MessageEmbed()
             .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
             .setDescription(`<a:queue:896619906466979860> **Added Song to queue**\n[${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri}) [<@${message.author.id}>]`)
         return message.channel.send({embeds: [thing]});
           } else {
         return message.channel.send({ embeds: [new MessageEmbed().setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor).setDescription('There were no results found.')]});
        }
      }
      else {
        var search = args.join(" ");
        var res;
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      res = await client.manager.search({
        query: search,
      }, message.author);
      if (search.startsWith("https://") || search.startsWith("http://")){
        if(res.loadType === "LOAD_FAILED" || res.loadType === "NO_MATCHES"){
                var thing = new MessageEmbed()
                        .setColor('#ff0000')
                        .setDescription('No Results Found')
                    return message.channel.send({embeds: [thing]})
        }
        else if(res.loadType == "TRACK_LOADED"){
          var track = res.tracks[0];
                player.queue.add(track);
                if (!player.playing && !player.paused && !player.queue.size) { 
                     player.play();
                } else {
                    var thing = new MessageEmbed()
                        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
                        .setAuthor('Added Song To Queue', message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
                        .setDescription(`<a:queue:896619906466979860> [${track.title.substring(0, 63)}](${track.uri})\n\n**Requester: **<@${track.requester.id}> | **Duration: **\`❯ ${convertTime(track.duration)}\``)
                    return message.channel.send({embeds: [thing]})
                        }
        }
        else if(res.loadType === "PLAYLIST_LOADED"){
          player.queue.add(res.tracks);
          if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
          var thing = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
                    .setAuthor('Added Playlist To Queue', message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
                    .setDescription(`<a:queue:896619906466979860> ${res.tracks.length} Songs **${res.playlist.name}**\n\n**Requester: **<@${tracks.requester.id}> | **Duration: **\`❯ [${convertTime(res.playlist.duration)}]\``)
                return message.channel.send({embeds: [thing]})
        }
        else if(res.loadType === "SEARCH_RESULT"){
          var track = res.tracks[0];
                player.queue.add(track);
                if (!player.playing && !player.paused && !player.queue.size) {
                    player.play();
                } else {
                    var thing = new MessageEmbed()
                        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
                        .setAuthor('Added Song To Queue', message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
                        .setDescription(`<a:queue:896619906466979860> [${track.title.substring(0, 63)}](${track.uri})\n\n**Requester: **<@${track.requester.id}> | **Duration: **\`❯ ${convertTime(track.duration)}\``)
                        
                    return message.channel.send({embeds: [thing]})
                       }
        }
      }
      else {
           var max = 10;
    var collected;
    var cmduser = message.author;
    var track = res.tracks[0]
    var theresults = res.tracks
      .slice(0, max)


    const emojiarray = ["1️<:num_1:937396369403047937>", "<:num_2:937396424348434512>", "<:num_3:937396419231379507>", "<:num_4:937396474134814741>", "<:num_5:937396467604287538>", "<:num_6:937396547237326888>", "<:num_7:937396583224471602>", "<:num_8:937396624647413840>", "<:num_9:937396813512724551>", "<:num_10:937396664300351578>"]
    first_layer()
    async function first_layer() {
      //define the selection
      var songoptions = [...emojiarray.slice(0, max).map((emoji, index) => {
          return {
            value: `${index}`,
            label: `${res.tracks[index].title}`.substr(0, 58),
            description: `${res.tracks[index].author} - ${convertTime(res.tracks[index].duration)}`,
            emoji: `${emoji}`
          }
        })
      ];
      let Selection = new MessageSelectMenu()
        .setCustomId('MenuSelection').setMaxValues(emojiarray.slice(0, max).length)
        .setPlaceholder('Select all Songs you want to add')
        .addOptions(songoptions)
      //send the menu msg
      let menumsg;
      
        menumsg = await message.channel.send({
          embeds: [
            new MessageEmbed()
            .setTitle(`Select tracks you want to add to the queue.`)
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
            
          ],
          components: [
            new MessageActionRow().addComponents(Selection)
          ]
        }).catch(() => {});
    
      //Create the collector
      const collector = menumsg.createMessageComponentCollector({
        filter: i => i.isSelectMenu() && i.message.author.id == client.user.id && i.user,
        time: 60000
      })
      //Menu Collections
      collector.on('collect', async menu => {
        if (menu.user.id === cmduser.id) {
          collector.stop();
          menu.deferUpdate();
          var picked_songs = [];
          let toAddTracks = [];
          for (const value of menu.values) {
            let songIndex = songoptions.findIndex(d => d.value == value);
            var track = res.tracks[songIndex]
            toAddTracks.push(track)
            picked_songs.push(`**${songIndex + 1})** [\`${String(track.title).substr(0, 60).split("[").join("\\[").split("]").join("\\]")}\`](${track.uri})`)
          }
          menumsg.edit({
            embeds: [new MessageEmbed().setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor).setTitle("Added To Queue").setDescription(toAddTracks.length > 1 ? `Queued **${toAddTracks.length}** Tracks` : `[${track.title.substr(0, 63)}](${track.uri})`)],
            components: []
          })
          if (player.state !== "CONNECTED") {
            //set the variables
            player.connect();
            //add track
            player.queue.add(toAddTracks);
            //set the variables
            //play track
            player.play();
            player.pause(false);

          } else if (!player.queue || !player.queue.current) {
            //add track
            player.queue.add(toAddTracks);
            //play track
            player.play();
            player.pause(false);
          }else {
            player.queue.add(toAddTracks);
            player.pause(false);
            
          }
        } else menu.reply({
          content: `❌ You are not allowed to do that! Only: <@${cmduser.id}>`,
          ephemeral: true
        });
      });
      //Once the Collections ended edit the menu message
      collector.on('end', collected => {
        menumsg.edit({embeds: [new MessageEmbed().setColor('#ff0000').setDescription('Cancelled the Selection')], components: [ ]})
      });
    }
      }
    }
  }
}