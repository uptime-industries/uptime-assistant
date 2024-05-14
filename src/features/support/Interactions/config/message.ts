import { ChatInputCommandInteraction } from 'discord.js';
import { Config } from '../../../../Modal/Config.js';
import { getEmbedModal } from '../../modals.js';

/**
 * Update the message used in support message
 * @param interaction Command interaction from the command handler
 */
export async function updateMessage(interaction: ChatInputCommandInteraction) {
    if (!interaction.inGuild()) return;
    const config = await Config.findOne({ guildId: interaction.guildId });
    await interaction.showModal(getEmbedModal(config?.support.title!, config?.support.description!));
}
