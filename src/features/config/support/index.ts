import {
    ActionRowBuilder,
    ChatInputCommandInteraction, ColorResolvable, ModalBuilder, TextInputBuilder, TextInputStyle
} from 'discord.js';
import { serverConfigs } from '../../../bot.js';

export { send } from './send.js';

export { setOtherRole, setRole } from './role.js';

/**
 *
 * @param interaction
 */
export async function updateMessage(interaction: ChatInputCommandInteraction) {
    if (!interaction.inGuild()) return;
    const config = serverConfigs.cache.get(interaction.guildId)?.support;
    const title = new TextInputBuilder()
        .setCustomId('title')
        .setLabel('Embed Title')
        .setPlaceholder('Title for the support embed')
        .setStyle(TextInputStyle.Short)
        .setValue(config?.embedTitle!)
        .setMaxLength(256);
    const description = new TextInputBuilder()
        .setCustomId('description')
        .setLabel('Embed Description')
        .setPlaceholder('Description for the support embed')
        .setStyle(TextInputStyle.Paragraph)
        .setValue(config?.embedDescription!)
        .setMaxLength(2048);
    interaction.showModal(new ModalBuilder()
        .setCustomId(`embed`)
        .setTitle('Support Embed Message')
        .setComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(title), new ActionRowBuilder<TextInputBuilder>().addComponents(description)));
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
