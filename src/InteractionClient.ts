import { Client, ClientOptions } from 'discord.js';
import fs from 'fs';

export class InteractionClient extends Client {
    constructor(options: ClientOptions) {
        super(options);
    }

    handleCommands(directory: string) {
        fs.readdirSync(directory).filter(file => file.endsWith('.ts')).forEach((file => {
            import(`../${directory}${file}`).then(command => new command.default(this));
        }));
    }
}