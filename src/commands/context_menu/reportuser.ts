import { ApplicationCommandType, PermissionFlagsBits, UserContextMenuCommandInteraction } from 'discord.js';
import { ContextMenuCommand } from '../../Client';
import { reportModal } from '../../features/report';

export default new ContextMenuCommand()
    .setBuilder((builder) => builder
        .setName('Report User')
        .setType(ApplicationCommandType.User)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages))
    .setGlobal(true)
    .setExecute(async (interaction:UserContextMenuCommandInteraction) => {
        if (interaction.targetUser.system || interaction.targetUser.bot) {
            return interaction.reply({ content:'This user is a bot and can not be reported', ephemeral:true });
        }
        return interaction.showModal(reportModal
            .setCustomId(`report_u_${interaction.targetUser.id}`));
    });

