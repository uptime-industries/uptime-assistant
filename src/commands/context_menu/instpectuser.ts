import {
    ApplicationCommandType, Colors, ContextMenuCommandType, GuildMember, InteractionContextType, PermissionFlagsBits, UserContextMenuCommandInteraction
} from 'discord.js';
import { ContextMenuCommand } from '../../Classes/index.js';
import { userEmbed } from '../../features/inspect.js';

export default new ContextMenuCommand()
    .setBuilder((builder) => builder
        .setName('Inspect User')
        .setType(ApplicationCommandType.User as ContextMenuCommandType)
        .setContexts(InteractionContextType.Guild)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages))
    .setExecute(execute);

/**
 *
 * @param interaction object from Discord API
 */
async function execute(interaction: UserContextMenuCommandInteraction) {
    await (interaction.targetMember as GuildMember).fetch();
    await interaction.reply({
        embeds: [await userEmbed(interaction.targetMember as GuildMember, Colors.White)],
        ephemeral: true
    });
}
