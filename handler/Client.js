const { Client } = require("discord.js");const chalk = require("chalk");
const array = [];
const mongoose = require('mongoose');
const { Database } = require("quickmongo");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const { LavasfyClient } = require("lavasfy");
const deezer = require("erela.js-deezer");
const apple = require("erela.js-apple");
const facebook = require("erela.js-facebook");
const { readdirSync } = require("fs");




/**
 * @param {Client} client
 */
module.exports = async (client) => {

	client.Lavasfy = new LavasfyClient(
      {
        clientID: "aece5b4d7d27426ebef592a75bd43a2c",
        clientSecret: "79a8a54525324e9aa3291eeb880ff287",
        playlistPageLoadLimit: 4,
        filterAudioOnlyResult: true,
        autoResolve: true,
        useSpotifyMetadata: true,
      },
      [
        {
          id: "main",
          host: "159.223.137.98",
          port: 2333,
          password: "BestLavalink",
          secure: false,
        },
      ]
    );

    client.manager = new Manager({
      plugins: [
        new deezer(),
        new apple(),
        new facebook(),
      ],
      nodes: [
        {
          identifier: "main",
          host: "159.223.137.98",
          port: 2333,
          password: "BestLavalink",
          secure: false,
        },
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    })
    
    client.on("raw", (d) => client.manager.updateVoiceState(d));
    /**
     * Mongodb connection
     */
    
    const dbOptions = {
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
      useUnifiedTopology: true,
    };
      mongoose.connect(client.config.mongourl, dbOptions);
      mongoose.set("useFindAndModify", false);
      mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            client.logger.log('[DB] DATABASE CONNECTED', "ready");
            });
        mongoose.connection.on('err', (err) => {
                console.log(`Mongoose connection error: \n ${err.stack}`, "error");
            });
        mongoose.connection.on('disconnected', () => {
                console.log('Mongoose disconnected');
            });
        
    /**
     * Error Handler
     */
    client.on("disconnect", () => console.log("Bot is disconnecting..."))
    client.on("reconnecting", () => console.log("Bot reconnecting..."))
    client.on('warn', error => console.log(error));
    client.on('error', error => console.log(error));
    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));
    
 /**
 * Client Events
 */
readdirSync("./events/Client/").forEach(file => {
    const event = require(`../events/Client/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
});

/**
 * Erela Manager Events
 */
readdirSync("./events/Lavalink/").forEach(file => {
    const event = require(`../events/Lavalink/${file}`);
    let eventName = file.split(".")[0];
    client.manager.on(eventName, event.bind(null, client));
});



/**
 * Import all commands
 */
readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`);
        client.commands.set(command.name, command);
    }
})

  const data = [];
  const cmdss = [];
       
  // readdirSync("./slashCommands/").forEach((dir) => {
  //       const slashCommandFile = readdirSync(`./slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));
    
  //       for (const file of slashCommandFile) {
  //           const slashCommand = require(`../slashCommands/${dir}/${file}`);

  //           if(!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);

  //           if(!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);

  //           client.slashCommands.set(slashCommand.name, slashCommand);
  //           cmdss.push(slashCommand.name)
  //           data.push(slashCommand);
  //       }
  //    });
     
     client.on("ready", async () => {
        await client.application.commands.set(data).then(() => client.logger.log(`Client Application (/) Registered.\n${cmdss.join(", ")} ${cmdss.length} Command Loaded.`, "cmd")).catch((e) => console.log(e));
    });
}