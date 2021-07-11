import { ApplicationCommandData, CommandInteraction, Guild } from 'discord.js';
import { InteractionClient } from '../InteractionClient';

export class SlashCommand {    
    constructor(options: CommandOptions, client?: InteractionClient) {
        // @ts-ignore typing errors with djs 13
        const commandTargets = options.guilds ? options.guilds.map(guild => client.guilds.cache.get(guild)) : [ client.application ];

        commandTargets.forEach(async (target) => {
            target.commands.create(options);
        });

        client.on('interactionCreate', (interaction) => { 
            if (interaction.isCommand() && interaction.commandName === options.name) this.run(interaction); 
        });
    }

    run(interaction: CommandInteraction) {
        interaction.reply('Hello World.');
    }
}

interface CommandOptions extends ApplicationCommandData {
    guilds?: string[];
}