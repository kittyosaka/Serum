const { MessageEmbed, Permissions } = require("discord.js");
const delay = require("delay");

module.exports = async (client, oldState, newState) => {
    const channel = newState.guild.channels.cache.get(
        newState.channel?.id ?? newState.channelId
    )
		// Only keep the bot in the voice channel by its self for 3 minutes
		const player = client.manager?.players.get(newState.guild.id)

		if (!player) return

		// Check for stage channel audience change
		if (newState.id == client.user.id && channel?.type == 'GUILD_STAGE_VOICE') {
			if (!oldState.channelId) {
				try {
					await newState.guild.me.voice.setSuppressed(false).then(() => console.log(null))
				} catch (err) {
					player.pause(false)
				}
			} 
		}

		if (oldState.id === client.user.id) return
		if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return

		// Don't leave channel if 24/7 mode is active
      let data = await client.db.get(`247_${newState.guild.id}`);
	if(!data)
    {
      return client.db.set(`247_${newState.guild.id}`, `false`);
    }
    if(data === `true`) return;

		// Make sure the bot is in the voice channel that 'activated' the event
		if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
			if (
				oldState.guild.me.voice?.channel &&
				oldState.guild.me.voice.channel.members.filter((m) => !m.user.bot).size === 0
			) {
				await delay(180000)

				// times up check if bot is still by themselves in VC (exluding bots)
				const vcMembers = oldState.guild.me.voice.channel?.members.size
				if (!vcMembers || vcMembers === 1) {
					const newPlayer = client.manager?.players.get(newState.guild.id)
					newPlayer ? player.destroy() : player.destroy();
					const embed = new MessageEmbed(client, newState.guild)
          .setColor(oldState.guild.me.displayHexColor !== '#000000' ? oldState.guild.me.displayHexColor : client.config.embedColor)
						// eslint-disable-next-line no-inline-comments
						.setDescription(`I left the voice channel because there were no members.\nTo disable this use \`24/7\` command `)
					try {
						const c = client.channels.cache.get(player.textChannel)
						if (c)
							c.send({ embeds: [embed] }).then((m) =>
                            setTimeout(() =>
								 30000)
							)
					} catch (err) {
						client.logger.error(err.message)
					}
				}
			}
		}


  /**
   * ANTI UNDEAF THE BOT 
   */



    
};