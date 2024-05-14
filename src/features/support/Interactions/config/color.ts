import { ChatInputCommandInteraction, ColorResolvable } from 'discord.js';
import { Config } from '../../../../Modal/Config.js';

/**
 * Update color of support embeds
 * @param interaction command interaction
 * @param color color to set 
 */
export async function setColor(interaction: ChatInputCommandInteraction, color?: ColorResolvable) {
    if (!interaction.inGuild()) return;

    const { guildId } = interaction;

    const guildConfig = await Config.findOne({ guildId });
    guildConfig!.support.color = color;
    await guildConfig?.save();

    await interaction.reply({
        content: `Embed color has been updated. Send new message with </config support send:${interaction.client.application.commands.cache.find((c)=> c.name == 'config')?.id}>`,
        ephemeral: true
    });
}
