import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder } from 'discord.js';
import i18n from '../../features/i18n';
import { Button } from '../../interfaces';

const button:Button = {
    name:'socials',
    async execute(_client, interaction) {
        interaction.reply({
            components:[new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .addComponents(new ButtonBuilder()
                    .setLabel(i18n(interaction.locale, 'socials-twitter'))
                    .setEmoji('1073843678159851521')
                    .setURL('https://twitter.com/Merocle')
                    .setStyle(ButtonStyle.Link))],
            ephemeral:true,
        });
    },
};
export default button;