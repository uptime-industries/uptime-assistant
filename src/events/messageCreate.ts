import { Events } from 'discord.js';
import { Event } from '../Client';

export default new Event()
    .setName(Events.MessageCreate)
    .setExecute(async (message) => {
        if (message.channelId == process.env.USER_INTRODUCTION_ID) {
            message.react('👋');
        }
    });