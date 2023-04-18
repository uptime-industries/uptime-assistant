import { Events } from 'discord.js';
import Event from '../classes/Event';

export default new Event()
    .setName(Events.MessageCreate)
    .setExecute(async (message) => {
        if (message.channelId == process.env.USER_INTRODUCTION_ID) {
            message.react('👋');
        }
    });