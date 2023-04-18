import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageActionRowComponentBuilder } from 'discord.js';
import i18n from '../../features/i18n';
import { Interaction } from '../../classes/Interaction';
export default new Interaction<ButtonInteraction>()
    .setName('rules')
    .setExecute(async (interaction) => {
        interaction.reply({
            embeds:[new EmbedBuilder()
                .setColor(interaction.client.config.colors.embed)
                .setTitle(`📜 ${i18n(interaction.locale, 'Rules-title')}`)
                .setDescription(i18n(interaction.locale, 'Rules'))],
            components:[new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .addComponents(new ButtonBuilder()
                    .setURL('https://dis.gd/tos')
                    .setStyle(ButtonStyle.Link)
                    .setLabel(i18n(interaction.locale, 'tos')))
                .addComponents(new ButtonBuilder()
                    .setURL('https://dis.gd/guidelines')
                    .setStyle(ButtonStyle.Link)
                    .setLabel(i18n(interaction.locale, 'guidelines')))],
            ephemeral:true,
        });
    });