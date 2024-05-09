import {
    ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle,
    ChannelType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionFlagsBits,
    TextChannel
} from 'discord.js';
import { serverConfigs } from '../../../bot.js';

/**
 *
 * @param interaction
 * @param channel
 */
export async function send(interaction: ChatInputCommandInteraction, channel?: TextChannel): Promise<void> {
    const iChannel = interaction.channel;
    const neededPerms = PermissionFlagsBits.ManageThreads | PermissionFlagsBits.SendMessages | PermissionFlagsBits.SendMessagesInThreads;
    const config = serverConfigs.cache.get(interaction.guildId!)?.support;
    if(!config?.role){
        await interaction.reply({
            content: `Please set Role using </config support role:${interaction.client.application.commands.cache.find((ac) => ac.type == ApplicationCommandType.ChatInput && ac.name == 'config')?.id}>`,
            ephemeral: true
        });
        return; 
    }
    

    if (!channel && iChannel?.type == ChannelType.GuildText) 
        channel = iChannel;
    else if (iChannel?.type != ChannelType.GuildText){
        await interaction.reply({
            content: `${iChannel} Is not a Text Channel. Plesse us Command in a Text Channel`,
            ephemeral: true
        });
        return; 
    }
    if (!channel)
        throw new Error('Channel undefined');
    if (!channel.permissionsFor(channel.guild.members.me!).has(neededPerms, true)) {
        await interaction.reply({
            content: `${interaction.client.user} is missing one or more of the following premisions in this channel: \`SendMessages\`, \`SendMessagesInThreads\`, \`ManageThreads\``,
            ephemeral: true
        });
        return;
    }
    
    const embed = new EmbedBuilder()
        .setTitle(config?.embedTitle)
        .setDescription(config?.embedDescription)
        .setColor(config.embedColor != undefined ? config.embedColor : null);
        
    let row = [new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setCustomId('ticket')
            .setLabel('Create a Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji(config?.buttonEmoji))];

    const message = await channel.send({
        embeds: [embed],
        components: row
    });
    if (channel != interaction.channel)
        row = [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder()
            .setURL(message.url)
            .setStyle(ButtonStyle.Link)
            .setLabel('Go to Message'))];
    else
        row = [];
    await interaction.reply({
        content: 'Support message successfully sent',
        components: row,
        ephemeral: true
    });
}
