import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '../interactions/SlashCommand';

export default class TestCommand extends SlashCommand {
    constructor(client) {
        super({
            name: 'hello',
            description: 'world',
            guilds: ['709303950511439893', '538205671712358450']
        }, client);
    }

    run(interaction: CommandInteraction) {
        interaction.reply('yo ddd');
    }
}