const { MessageEmbed } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "playlist-addcurrent",
    aliases: ["pl-addcurrent"],
    category: "Playlist",
    premium: true,
    description: "Saves Current Song To Playlist.",
    args: true,
    usage: "<playlist name>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const Name = args[0];
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        const player = client.manager.players.get(message.guild.id);
        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("There is no music playing.");
            return message.reply({ embeds: [thing] });
        }
        if (!data) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:cross1:853965073383292970> You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:cross1:853965073383292970> You don't have any Playlist named **${Name}**.`)] });
        }
        const song = player.queue.current;
        let oldSong = data.Playlist;
        if (!Array.isArray(oldSong)) oldSong = [];
        oldSong.push({
            "title": song.title,
            "uri": song.uri,
            "author": song.author,
            "duration": song.duration
        });
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name
        },
            {
                $push: {
                    Playlist: {
                    title: song.title,
                    uri: song.uri,
                    author: song.author,
                    duration: song.duration
                        }

                }
            });
        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setAuthor(`Added Song To Playlist ${Name}`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
            .setDescription(`<a:queue:896619906466979860> [${song.title.substring(0, 63)}](${song.uri})`)
        return message.channel.send({ embeds: [embed] })

    }
}