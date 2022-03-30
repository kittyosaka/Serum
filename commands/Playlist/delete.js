const { MessageEmbed } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "playlist-delete",
    aliases: ["pl-delete"],
    category: "Playlist",
    premium: true,
    description: "Deletes A Playlist.",
    args: true,
    usage: "<playlist name>",
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
        await data.delete();
        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setDescription(`<:Success:853965334297444393> Playlist **${Name}** Deleted`)
        return message.channel.send({ embeds: [embed] })
    }
}