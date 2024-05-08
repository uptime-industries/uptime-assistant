import { Events } from 'discord.js';
import { Event } from '../../Classes/index.js';

export default new Event({
    name: Events.Error,
    // eslint-disable-next-line no-console
    execute: async (error: Error) => console.error(error)
});
