const { ShardingManager } = require('discord.js');
const  { bot_token } = require('./config.json');

const manager = new ShardingManager('./index.js', {            totalShards: 3,
     token: bot_token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn({timeout: Infinity});