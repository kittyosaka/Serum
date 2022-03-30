const { MessageEmbed } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "playlist-removetrack",
    aliases: ["pl-removetrack"],
    category: "Playlist",
    premium: true,
    description: "Removes A Track From Playlist.",
    args: true,
    usage: "<playlist name> <track number>",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {

        const Name = args[0];
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:cross1:853965073383292970> You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:cross1:853965073383292970> You don't have any Playlist named **${Name}**.`)] });
        }
        const Options = args[1];
        if (!Options || isNaN(Options)) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:cross1:853965073383292970> Invalid track number provided for Playlist ${Name}.`)] });
        }
        let tracks = data.Playlist;
        if (Number(Options) >= tracks.length || Number(Options) < 0) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:cross1:853965073383292970> Invalid track number provided for Playlist ${Name}.`)] });

        }
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name
        },
            {
                $pull: {
                    Playlist: data.Playlist[Options]
                }
            });
            const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setAuthor(`Removed Song From Playlist ${Name}`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
            .setDescription(`<a:queue:896619906466979860> [${tracks[Options].title.substring(0, 63)}](${tracks[Options].uri})`);
            return message.channel.send({embeds: [embed]});
    }
};