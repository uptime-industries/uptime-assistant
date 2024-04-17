import { ApplicationCommandType, MessageContextMenuCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { ContextMenuCommand } from '../../Classes/index.js';
import { reportModal } from '../../features/report.js';

export default new ContextMenuCommand()
    .setBuilder((builder) => builder
        .setName('Report Message')
        .setType(ApplicationCommandType.Message)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages))
    .setExecute(execute);

async function execute(interaction:MessageContextMenuCommandInteraction) {
    const { splitCustomIDOn } = interaction.client
    if (interaction.targetMessage.author.system || interaction.targetMessage.author.bot) {
        return interaction.reply({ content:'This message is from a bot and can not be reported', ephemeral:true });
    }
    return interaction.showModal(reportModal
        .setCustomId(`report${splitCustomIDOn}m${splitCustomIDOn}${interaction.targetMessage.channelId}${splitCustomIDOn}${interaction.targetMessage.id}`));
}