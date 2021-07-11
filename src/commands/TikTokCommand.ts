import { CommandInteraction } from 'discord.js';
import { video } from 'tiktok-scraper';
import fs from 'fs';
import { SlashCommand } from '../interactions/SlashCommand';

export default class TikTokCommand extends SlashCommand {
    constructor(client) {
        super({
            name: 'tiktok', 
            description: 'download a tiktok video from url', 
            guilds: ['709303950511439893', '538205671712358450'],
            options: [{
                name: 'url', 
                description: 'video url', 
                required: true, 
                type: 'STRING' 
            }]
        }, client);
    }

    async run(interaction: CommandInteraction) {
        const url = interaction.options.get('url').value;

        await video(url.toString(), { download: true, filepath: './files' });
        const file = fs.readdirSync('./files')[0];

        await interaction.reply({ files: [`./files/${file}`] });
        fs.unlink(`./files/${file}`, () => {});
    }
}