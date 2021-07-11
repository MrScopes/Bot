import { ApplicationCommandData, CommandInteraction, Guild } from 'discord.js';
import { InteractionClient } from '../InteractionClient';

export class SlashCommand {    
    constructor(options: CommandOptions, client?: InteractionClient) {
        const commandTargets = options.guilds ? options.guilds.map((guild: `${bigint}`) => client.guilds.cache.get(guild)) : [ client.application ];

        if (options.allowedRoles || options.allowedUsers || options.disallowedRoles || options.disallowedUsers) 
        options.defaultPermission = false;

        let permissions: any = false;

        if (options.allowedRoles) {
            Object.assign(permissions, { })
        }

        if (options.allowedRoles) {
            permissions = options.allowedRoles.map(role => {
                return { 
                        id: role, 
                        type: 'role', 
                        permission: true 
                    }
                });
            }

            if (options.guilds) {
                options.guilds.forEach(async (guild: any) => {
                    const guildObj = client.guilds.cache.get(guild);
                    await guildObj.commands.create(options);

                    if (permissions instanceof Object) {
                        console.log(options.name);
                        // @ts-ignore
                        guildObj.commands.cache.get(options.name).permissions.add({ permissions });
                    }
                });
            } else {
                client.application.commands.create(options);
                if (permissions) 
                    // @ts-ignore
                    client.application.commands.cache.get(options.name).permissions.set(permissions);
            }

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
    allowedRoles?: string[];
    allowedUsers?: string[];
    disallowedRoles?: string[];
    disallowedUsers?: string[];
}