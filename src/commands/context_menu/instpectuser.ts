import { ApplicationCommandType, Colors, GuildMember, PermissionFlagsBits, UserContextMenuCommandInteraction } from 'discord.js';
import { ContextMenuCommand } from '../../Client';
import { userEmbed } from '../../features/inspect';

export default new ContextMenuCommand()
    .setBuilder((builder) => builder
        .setName('Instpect User')
        .setType(ApplicationCommandType.User)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages))
    .setExecute(execute);

async function execute(interaction: UserContextMenuCommandInteraction) {
    await (interaction.targetMember as GuildMember).fetch();
    interaction.reply({
        embeds:[await userEmbed(interaction.targetMember as GuildMember, Colors.White)],
        ephemeral: true,
    });
}