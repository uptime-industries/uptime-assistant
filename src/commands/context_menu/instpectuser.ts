import {
    ApplicationCommandType, Colors, GuildMember, PermissionFlagsBits, UserContextMenuCommandInteraction
} from 'discord.js';
import { ContextMenuCommand } from '../../Classes/index.js';
import { userEmbed } from '../../features/inspect.js';

export default new ContextMenuCommand<UserContextMenuCommandInteraction>()
    .setBuilder((builder) => builder
        .setName('Instpect User')
        .setType(ApplicationCommandType.User)
        .setDMPermission(false)
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
