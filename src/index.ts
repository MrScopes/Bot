import { InteractionClient } from './InteractionClient';
import config from '../config.json';
const client = new InteractionClient({ intents: [] });

client.on('ready', async () => {
    await client.guilds.cache.get('709303950511439893').commands.set([]);

    client.handleCommands('./src/commands/');
    console.log(`Ready as ${client.user.tag}.`);
});

client.on('error', console.error);
process.on('unhandledRejection', console.error);

client.login(config.token);