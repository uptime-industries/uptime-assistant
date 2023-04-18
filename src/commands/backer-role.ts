import { GuildMemberRoleManager } from 'discord.js';
import i18n, { fallback, localization } from '../features/i18n';
import { ChatInputCommand } from '../classes/Command';

export default new ChatInputCommand()
    .setBuilder((builder) => builder
        .setName(fallback('backer-name'))
        .setNameLocalizations(localization('backer-name'))
        .setDescription(fallback('backer-description'))
        .setDescriptionLocalizations(localization('backer-description'))
        .setDMPermission(true)
        .addStringOption(option => option
            .setName(fallback('backer-code-name'))
            .setNameLocalizations(localization('backer-code-name'))
            .setDescription(fallback('backer-code-description'))
            .setDescriptionLocalizations(localization('backer-code-description'))
            .setRequired(true)))
    .setGlobal(true)
    .setExecute(async (interaction) => {
        let content = 'backer-reply-failed';
        if (interaction.inGuild() && interaction.member.roles instanceof GuildMemberRoleManager && process.env.CODE == interaction.options.getString(fallback('backer-code-name'), true)) {
            content = 'backer-reply-success';
            interaction.member.roles.add(process.env.ROLE_BACKER_ROLE_ID, 'Backer Code Validated');
        }
        interaction.reply({
            content: i18n(interaction.locale, content),
            ephemeral:true,
        });
    });