import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export const reportModal = new ModalBuilder()
    .setTitle('Report')
    .setComponents(
        new ActionRowBuilder<TextInputBuilder>()
            .setComponents(
                new TextInputBuilder()
                    .setCustomId('comment')
                    .setLabel('Comment')
                    .setPlaceholder('Advertising, Repetitive messages, Off-topic messages, etc.')
                    .setMaxLength(1000)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Paragraph)),
    );