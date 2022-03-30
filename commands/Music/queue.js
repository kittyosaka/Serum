const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const lodash = require("lodash");
const { convertTime } = require("../../utils/convert.js");
module.exports = {
  	name: "queue",
	 aliases: ["q"],
    category: "Music",
  	description: "Display the queue of this server.",
    usage: "",
    args: false,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: false,
	 execute: async (message, args, client, prefix) => {
     let m = ")";
            //get the right tracks of the current tracks
      const player = message.client.manager.get(message.guild.id);
      if(!player.queue.current){
        return message.channel.send({embeds: [new MessageEmbed().setColor(`#ff0000`).setDescription(`There Is Nothing Playing.`)]})
      }
      
     let tracks = player.queue.map((x, i) => `${++i}${m} ${getspaces(x.title)}${x.duration ? `${convertTime(Number(x.duration))}` : ""}`);
     const pages = lodash.chunk(tracks, 10).map((x) => x.join(`\n`));
     let page = 0;
     if (pages.length <= 1) {
      return await message.reply(pages[page] ? `\`\`\`nim\n    ⬐ current track\n${getspaces(player.queue.current.title)}   ${convertTime(player.queue.current.duration - player.position)} left\n    ⬑ current track\n\n${pages[page]}\n\n   This is the end of the queue!\`\`\`` : `\`\`\`nim\n    ⬐ current track\n${getspaces(player.queue.current.title)}   ${convertTime(player.queue.current.duration - player.position)} left\n    ⬑ current track\n\n   This is the end of the queue!\`\`\``)
    }
  else {
       let previousbut = new MessageButton().setCustomId("queueprev").setEmoji("<:green_blue_arrow_left:932227439743103036>").setStyle("SUCCESS");

            let nextbut = new MessageButton().setCustomId("queuenext").setEmoji("<:GreenBlueArrow:932227436626726934>").setStyle("SUCCESS");

            let stopbut = new MessageButton().setCustomId("queuestop").setEmoji("⏹️").setStyle("DANGER");

            const row = new MessageActionRow().addComponents(previousbut, stopbut, nextbut);

            const m = await message.reply({ content: `\`\`\`nim\n    ⬐ current track\n${getspaces(player.queue.current.title)}   ${convertTime(player.queue.current.duration - player.position)} left\n    ⬑ current track\n\n${pages[page]}\n\n   This is the end of the queue!\`\`\``, components: [row] });

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
                if (b.customId === "queueprev") {
                    page = page - 1 < 0 ? pages.length - 1 : --page;
                    if (!m) return;
            return await m.edit(`\`\`\`nim\n${player.queue.current ? `    ⬐ current track\n${getspaces(player.queue.current.title)}   ${convertTime(player.queue.current.duration - player.position)} left\n    ⬑ current track\n\n${pages[page]}\n\n   This is the end of the queue!` : `There is currently no song in the queue ...`}\`\`\``); 
                } else if (b.customId === "queuestop") {
                    return collector.stop();
                } else if (b.customId === "queuenext")
                    page = page + 1 >= pages.length ? 0 : ++page;
                if (!m) return;
              return await m.edit(`\`\`\`nim\n${player.queue.current ? `    ⬐ current track\n${getspaces(player.queue.current.title)}   ${convertTime(player.queue.current.duration - player.position)} left\n    ⬑ current track\n\n${pages[page]}\n\n   This is the end of the queue!` : `There is currently no song in the queue ...`}\`\`\``);
            });
        }

    }
};
function getspaces(text) {
  if(text.length == 38) return text + " ";
  let newtest = "";
  if(text.length < 38){
    newtest = text;
    for(let i = text.length; i< 38; i++){
      newtest = newtest + " ";
    }
    return newtest + " ";
  }
  else if(text.length > 38){
    newtest = text.substring(0, 37);
    newtest = newtest + "… "
    return newtest;
  }
}