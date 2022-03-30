const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("../../schema/playlist");
const { convertTime } = require("../../utils/convert.js");
const lodash = require("lodash");

module.exports = {
    name: "playlist-info",
    aliases: ["pl-info"],
    category: "Playlist",
    premium: true,
    description: "Gives You The Information Of A Playlist.",
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
        let tracks = data.Playlist.map((x, i) => `${+i} - ${x.title.substring(0, 45)}... ${x.duration ? `${convertTime(Number(x.duration))}` : ""}`);
        const pages = lodash.chunk(tracks, 10).map((x) => x.join("\n"));
        let page = 0;
        var embed = new MessageEmbed()
            .setAuthor(`${message.author.username}'s Playlists`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
            .setColor("#2F3136")
            .addField(`**Playlist Name:**`, `**${data.PlaylistName}**`)
            .addField(`**Playlist Size:**`, `**${data.Playlist.length}**`)
            .addField(`**Playlist Songs:**`, `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``)
        const em = new MessageEmbed()
        const em1 = new MessageEmbed()
        if (pages.length <= 1) {
            return await message.reply({ embeds: [embed] })
        } else {

            let previousbut = new MessageButton().setCustomId("playlist_cmd_ueuwbdl_uwu-previous").setEmoji("<:green_blue_arrow_left:932227439743103036>").setStyle("SUCCESS");

            let nextbut = new MessageButton().setCustomId("playlist_cmd_uwu-next").setEmoji("<:GreenBlueArrow:932227436626726934>").setStyle("SUCCESS");

            let stopbut = new MessageButton().setCustomId("playlist_cmd_uwu-stop").setEmoji("⏹️").setStyle("DANGER");

            const row = new MessageActionRow().addComponents(previousbut, stopbut, nextbut);

            const m = await message.reply({ embeds: [embed], components: [row] });

            const collector = m.createMessageComponentCollector({
                filter: (b) => b.user.id === message.author.id ? true : false && b.deferUpdate().catch(() => { }),
                time: 60000 * 5,
                idle: 60000 * 5 / 2
            });

            collector.on("end", async () => {
                if (!m) return;
                await m.edit({ components: [new MessageActionRow().addComponents(previousbut.setDisabled(true), stopbut.setDisabled(true), nextbut.setDisabled(true))] });
            });

            collector.on("collect", async (b) => {
                if (!b.deferred) await b.deferUpdate().catch(() => { });
                if (b.customId === "playlist_cmd_ueuwbdl_uwu-previous") {
                    page = page - 1 < 0 ? pages.length - 1 : --page;
                    if (!m) return;
            embed = new MessageEmbed()
            .setAuthor(`${message.author.username}'s Playlists`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
            .setColor("#2F3136")
            .addField(`**Playlist Name:**`, `**${data.PlaylistName}**`)
            .addField(`**Playlist Size:**`, `**${data.Playlist.length}**`)
            .addField(`**Playlist Songs:**`, `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``)
            return await m.edit({ embeds: [embed] });
                } else if (b.customId === "playlist_cmd_uwu-stop") {
                    return collector.stop();
                } else if (b.customId === "playlist_cmd_uwu-next")
                    page = page + 1 >= pages.length ? 0 : ++page;
                if (!m) return;
              embed = new MessageEmbed()
            .setAuthor(`${message.author.username}'s Playlists`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/M2yU2Nzydj")
            .setColor("#2F3136")
            .addField(`**Playlist Name:**`, `**${data.PlaylistName}**`)
            .addField(`**Playlist Size:**`, `**${data.Playlist.length}**`)
            .addField(`**Playlist Songs:**`, `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``)

                return await m.edit({ embeds: [embed] });
            });
        }

    }
};