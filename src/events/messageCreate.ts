import { Events, Message } from 'discord.js';
import { Event } from '../interfaces';

const event:Event = {
    name:Events.MessageCreate,
    async execute(_client, message:Message) {
        if (message.channelId == '1070911769083658280') {
            message.react('👋');
        }
    },
};
export default event;