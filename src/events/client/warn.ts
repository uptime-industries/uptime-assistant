import { Events } from 'discord.js';
import { Event } from '../../Classes/index.js';

export default new Event({
    name: Events.Warn,
    // eslint-disable-next-line no-console
    execute: async (info: string) => console.warn(info)
});
