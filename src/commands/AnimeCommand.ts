import { CommandInteraction, MessageActionRow, MessageSelectMenu } from 'discord.js';
import { SlashCommand } from '../interactions/SlashCommand';
import { Client as AniList } from 'anilist.js';

const AniClient = new AniList();

export default class AnimeCommand extends SlashCommand {
    constructor(client) {
        super({
            name: 'anime',
            description: 'get anime information',
            guilds: ['709303950511439893', '538205671712358450'],
            options: [
                { 
                    name: 'title', 
                    description: 'anime title', 
                    required: true, 
                    type: 'STRING' 
                }
            ]
        }, client);
    }

    async run(interaction: CommandInteraction) {
        const title = interaction.options.get('title').value.toString();
        const search = await AniClient.searchMedia({ search: title, sort: ['POPULARITY_DESC'], type: 'ANIME' });

        const row = new MessageActionRow();

        search.Results.length = 25;

        const opts = [];
        search.Results.forEach(anime => {
            let title = (anime.info.title.english || anime.info.title.romaji);
            title = title.replace(/season /i, 'S');
            opts.push({ label: title.length >= 22 ? `${title.substring(0, 22)}...` : title, description: `(${anime.info.season} ${anime.info.startDate.year}) ${anime.info.format} - Eps: ${anime.info.nextAiringEpisode ? `${anime.info.nextAiringEpisode.episode - 1}` : anime.info.episodes}`, value: anime.info.id.toString() });
        });

        row.addComponents(new MessageSelectMenu({ customId: 'list', placeholder: 'Choose which anime you want info on.', options: opts }));
        await interaction.reply({ content: '** **', components: [row] });

        interaction.client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;
        
            if (interaction.customId === 'list') {
                const media = search.Results.filter(anime => anime.info.id.toString() === interaction.values[0])[0].info;
                    
                await interaction.update({ 
                    embeds: [
                        {
                            author: { name: `${media.title?.english || media.title?.romaji} (${media.status})`, icon_url: 'https://anilist.co/img/icons/android-chrome-512x512.png' },
                            image: { url: media.bannerImage?.toString() },
                            // @ts-ignore
                            color: media.coverImage?.color,
                            description: media.description.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<br>/g, '').replace(/<i>/g, '').replace(/<\/i>/g, ''),
                            fields: [
                                { name: 'Genres', value: media.genres?.map((genre: any) => genre).join(', '), inline: true },
                                { name: 'Tags', value: media.tags?.map((tag: any) => tag.isMediaSpoiler ? `||${tag.name}||` : tag.name).join(', ') }
                            ]
                        }
                    ]
                });
            }
        });
    }
}