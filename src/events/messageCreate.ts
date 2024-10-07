import { Events } from 'discord.js';
import { Event } from '../Classes/index.js';

export default new Event()
    .setName(Events.MessageCreate)
    .setExecute(async (message) => {
        if (message.channelId == process.env.USER_INTRODUCTION_CHANNEL_ID) {
            message.react('👋');
        } 
    });
