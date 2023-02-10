import { GuildMemberRoleManager, SlashCommandBuilder } from 'discord.js';
import i18n, { fallback, localization } from '../features/i18n';
import { ChatInputCommand } from '../interfaces';

const command:ChatInputCommand = {
    options: new SlashCommandBuilder()
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
            .setRequired(true)),
    global:true,
    async execute(client, interaction) {
        let content = 'backer-reply-failed';
        if (interaction.inGuild() && interaction.member.roles instanceof GuildMemberRoleManager && process.env.CODE == interaction.options.getString(fallback('backer-code-name'), true)) {
            content = 'backer-reply-success';
            interaction.member.roles.add(client.config.backerRole, 'Backer Code Validated');
        }
        interaction.reply({
            content: i18n(interaction.locale, content),
            ephemeral:true,
        });
    },
};
export default command;