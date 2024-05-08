import {
    ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle
} from 'discord.js';

const subject = new TextInputBuilder()
    .setCustomId('subject')
    .setLabel('subject')
    .setPlaceholder('What can we help you with?')
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setMaxLength(256);
const body = new TextInputBuilder()
    .setCustomId('body')
    .setLabel('body')
    .setPlaceholder('Describe your question')
    .setRequired(true)
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(512);

export const createTicket = new ModalBuilder()
    .setCustomId('ticket')
    .setTitle('Create a Ticket')
    .setComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(subject), new ActionRowBuilder<TextInputBuilder>().addComponents(body));
