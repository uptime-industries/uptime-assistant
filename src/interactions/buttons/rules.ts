import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageActionRowComponentBuilder } from 'discord.js';
import { t } from '../../i18n';
import { Interaction } from '../../Client';
const ns = 'rules';
export default new Interaction<ButtonInteraction>()
    .setName('rules')
    .setExecute(async (interaction) => {
        interaction.reply({
            embeds:[new EmbedBuilder()
                .setColor('#2b2d31')
                .setTitle(`📜 ${t('Rules-title', interaction.locale, ns)}`)
                .setDescription(t('Rules', interaction.locale, ns))],
            components:[new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .addComponents(new ButtonBuilder()
                    .setURL('https://dis.gd/tos')
                    .setStyle(ButtonStyle.Link)
                    .setLabel(t('tos', interaction.locale, ns)))
                .addComponents(new ButtonBuilder()
                    .setURL('https://dis.gd/guidelines')
                    .setStyle(ButtonStyle.Link)
                    .setLabel(t('guidelines', interaction.locale, ns)))],
            ephemeral:true,
        });
    });