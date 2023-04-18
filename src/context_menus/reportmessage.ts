import { ApplicationCommandType, MessageContextMenuCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { ContextMenuCommand } from '../classes/Command';
import { reportModal } from '../features/report';

export default new ContextMenuCommand()
    .setBuilder((builder) => builder
        .setName('Report Message')
        .setType(ApplicationCommandType.Message)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages))
    .setGlobal(true)
    .setExecute(execute);

async function execute(interaction:MessageContextMenuCommandInteraction) {
    if (interaction.targetMessage.author.system || interaction.targetMessage.author.bot) {
        interaction.reply({ content:'This message is from a bot and can not be reported', ephemeral:true });
        return;
    }
    interaction.showModal(reportModal
        .setCustomId(`report_m_${interaction.targetMessage.channelId}_${interaction.targetMessage.id}`));
}