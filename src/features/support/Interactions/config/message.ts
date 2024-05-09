import { ChatInputCommandInteraction } from 'discord.js';
import { serverConfigs } from '../../../../bot.js';
import { getEmbedModal } from '../../modals.js';

/**
 * Update the message used in support message
 * @param interaction Command interaction from the command handler
 */
export async function updateMessage(interaction: ChatInputCommandInteraction) {
    if (!interaction.inGuild()) return;
    const config = serverConfigs.cache.get(interaction.guildId)?.support;
    await interaction.showModal(getEmbedModal(config?.embedTitle!, config?.embedDescription!));
}
