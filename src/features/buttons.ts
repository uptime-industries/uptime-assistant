import { ButtonBuilder, ButtonStyle, ChatInputCommandInteraction } from 'discord.js';
import i18n from './i18n';

export function kickstarterButton(interaction:ChatInputCommandInteraction) {
    return new ButtonBuilder()
        .setURL('https://www.kickstarter.com/projects/uptimelab/compute-blade')
        .setStyle(ButtonStyle.Link)
        .setLabel(i18n(interaction.locale, 'kickstarter-reply-button'))
        .setEmoji('1067231245576175657');
}