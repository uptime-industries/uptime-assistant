import { ChatInputCommandInteraction, ColorResolvable } from 'discord.js';
import { serverConfigs } from '../../../../bot.js';

/**
 * Update color of support embeds
 * @param interaction command interaction
 * @param color color to set 
 */
export async function setColor(interaction: ChatInputCommandInteraction, color?: ColorResolvable) {
    if (!interaction.inGuild()) return;

    const { guildId } = interaction;
    const guildConfig = serverConfigs.cache.get(guildId);
    
    guildConfig?.support.setEmbedColor(color);
    serverConfigs.cache.set(guildId, guildConfig!);
    serverConfigs.saveConfigs();

    await interaction.reply({
        content: `Embed color has been updated. Send new message with </config support send:${interaction.client.application.commands.cache.find((c)=> c.name == 'config')?.id}>`,
        ephemeral: true
    });
}
