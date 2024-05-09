import { ChatInputCommandInteraction, ColorResolvable } from 'discord.js';
import { serverConfigs } from '../../../bot.js';
import { getEmbedModal } from '../../support/modals.js';

export { send } from './send.js';

export { setOtherRole, setRole } from './role.js';

/**
 *
 * @param interaction
 */
export async function updateMessage(interaction: ChatInputCommandInteraction) {
    if (!interaction.inGuild()) return;
    const config = serverConfigs.cache.get(interaction.guildId)?.support;
    return interaction.showModal(getEmbedModal(config?.embedTitle!, config?.embedDescription!));
}

/**
 *
 * @param interaction
 * @param color
 */
export async function setColor(interaction: ChatInputCommandInteraction, color?: ColorResolvable) {
    if (!interaction.inGuild()) return;

    const { guild, guildId } = interaction;
    const guildConfig = serverConfigs.cache.get(guildId);
    

    guildConfig?.support.setEmbedColor(color);

    serverConfigs.cache.set(guildId, guildConfig!);

    serverConfigs.saveConfigs();

    return interaction.reply({
        content: `Embed color has been updated. Send new message with </config support send:${interaction.client.application.commands.cache.find((c)=> c.name == 'config')?.id}>`,
        ephemeral: true
    });
}
