import { ActionRowBuilder, MessageActionRowComponentBuilder, SlashCommandBuilder } from 'discord.js';
import { kickstarterButton } from '../features/buttons';
import i18n, { fallback, localization } from '../features/i18n';
import { ChatInputCommand } from '../interfaces';

const command:ChatInputCommand = {
    options: new SlashCommandBuilder()
        .setName(fallback('kickstarter-name'))
        .setNameLocalizations(localization('kickstarter-name'))
        .setDescription(fallback('kickstarter-description'))
        .setDescriptionLocalizations(localization('kickstarter-description'))
        .setDMPermission(true),
    global:true,
    async execute(_client, interaction) {
        interaction.reply({
            content: i18n(interaction.locale, 'kickstarter-reply'),
            components:[
                new ActionRowBuilder<MessageActionRowComponentBuilder>()
                    .addComponents(kickstarterButton(interaction)),
            ],
        });
    },
};
export default command;