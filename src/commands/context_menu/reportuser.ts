import {
    ApplicationCommandType, PermissionFlagsBits, UserContextMenuCommandInteraction
} from 'discord.js';
import { ContextMenuCommand } from '../../Classes/index.js';
import { reportModal } from '../../features/report.js';

export default new ContextMenuCommand<UserContextMenuCommandInteraction>()
    .setBuilder((builder) => builder
        .setName('Report User')
        .setType(ApplicationCommandType.User)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages))
    .setExecute(async (interaction: UserContextMenuCommandInteraction) => {
        const { splitCustomIDOn } = interaction.client;
        if (interaction.targetUser.system || interaction.targetUser.bot){ 
            await interaction.reply({ content: 'This user is a bot and can not be reported', ephemeral: true });
            return;
        }
        
        await interaction.showModal(reportModal
            .setCustomId(`report${splitCustomIDOn}u${splitCustomIDOn}${interaction.targetUser.id}`));
    });

