import {
    ActionRowBuilder,
    ButtonInteraction, ModalBuilder, TextInputBuilder,
    TextInputStyle
} from 'discord.js';
import { Interaction } from '../../Classes/index.js';

export default new Interaction<ButtonInteraction>({ customIdPrefix: 'ticket' })
    .setRun(async (interaction: ButtonInteraction) => {
        const modal = new ModalBuilder()
            .setCustomId('ticket')
            .setTitle('Create a Ticket');
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
        modal.setComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(subject), new ActionRowBuilder<TextInputBuilder>().addComponents(body)
        );
        interaction.showModal(modal);
    });
