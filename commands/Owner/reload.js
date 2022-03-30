const { Discord } = require("discord.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "reload",
    category: "Owner",
    description: "Reloads The Command",
    args: false,
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
      const em1 = new MessageEmbed();
if (!client.owner.includes(message.author.id)) {
   return;
};
      if (!args[0]) {
            const opp = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`Please include the command`)
            return message.channel.send({embeds: [opp]})
          }
      let reload = false;
      for (let i = 0; i < client.categories.length; i += 1) {
        let dir = client.categories[i];
        try {
          delete require.cache[require.resolve(`../../commands/${dir}/${args[0]}.js`)] // usage !reload <name>
          client.commands.delete(args[0])
          const pull = require(`../../commands/${dir}/${args[0]}.js`)
          client.commands.set(args[0], pull)
          reload = true;
        } catch {}
      }
      if (reload) {
        const op = new MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`<:Success:853965334297444393> Reloaded \`${args[0]}\``)
        return message.channel.send({embeds: [op]})
      }
      const notop = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription(`<:cross1:853965073383292970> Could not reload: \`${args[0]}\``)
      return message.channel.send({embeds: [notop]});
   }
}