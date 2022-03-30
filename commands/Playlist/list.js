const { MessageEmbed } = require("discord.js");
const db = require("../../schema/playlist");
const lodash = require("lodash");

module.exports = {
    name: "playlist-list",
    aliases: ["pl-list"],
    category: "Playlist",
    premium: true,
    description: "Gives You The List Of The Playlists.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.find({ UserId: message.author.id});
        if (!data.length) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:cross1:853965073383292970> You don't have any Playlist.`)] });
        }
           const embeds = new MessageEmbed()
          data.map((x, i) => embeds.addField(`**<a:arrow_yellowright:951144928828870756> Playlist: ${++i} | Name: ${x.PlaylistName}**`, `**Tracks: ${x.Playlist.length} | Created On: <t:${x.CreatedOn}> (<t:${x.CreatedOn}:R>)**`))
              embeds.setAuthor(`${message.author.username}'s Playlists`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
              embeds.setColor("#2F3136");
            return await message.channel.send({ embeds: [embeds] });

    }
};