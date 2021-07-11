import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '../interactions/SlashCommand';

export default class PollCommand extends SlashCommand {
    constructor(client) {
        super({
            name: 'poll', 
            description: 'Manage polls', 
            guilds: ['709303950511439893', '538205671712358450'],
            options: [
                {
                    name: 'method', 
                    description: 'manage a poll', 
                    type: 'STRING',
                    required: true, 
                    choices: [
                        {
                            name: 'create',
                            value: 'create',
                        },
                        {
                            name: 'delete',
                            value: 'delete'
                        },
                        {
                            name: 'check',
                            value: 'check',
                        }
                    ]
                },
                {
                    name: 'poll', 
                    description: 'poll id', 
                    required: true, 
                    type: 'STRING' 
                },
            ],
            allowedRoles: ['538528364093505536', '699006059830050967']  
        }, client);
    }

    async run(interaction: CommandInteraction) {
        interaction.reply(interaction.options.map(option => option.value).join(' '));
    }
}