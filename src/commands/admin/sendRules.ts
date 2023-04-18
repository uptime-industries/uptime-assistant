import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageActionRowComponentBuilder, PermissionsBitField, TextChannel } from 'discord.js';
import { fallback } from '../../features/i18n';
import { ChatInputCommand } from '../../classes/Command';

export default new ChatInputCommand()
    .setBuilder((builder) => builder
        .setName('welcome')
        .setDescription('Welcome messages')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
        .setDMPermission(false)
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel where to send message')
            .setRequired(true)))
    .setGlobal(true)
    .setExecute(async (interaction) => {
        const channel = interaction.options.getChannel('channel', true);
        if (!(channel instanceof TextChannel)) { return; }
        await channel.send({
            embeds:[new EmbedBuilder()
                .setTitle('Welcome to the Uptime Lab Discord')
                .setDescription(fallback('welcome'))
                .setColor(interaction.client.config.colors.embed)
                .setImage('https://cdn.discordapp.com/attachments/1014458643816661083/1073779941252022313/b681a17ca10c3fa31c05fa2b440e3640.png')],
            components:[new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .addComponents(new ButtonBuilder()
                    .setCustomId('rules')
                    .setLabel('Rules')
                    .setEmoji('📜')
                    .setStyle(ButtonStyle.Primary))
                .addComponents(new ButtonBuilder()
                    .setCustomId('socials')
                    .setLabel('Socials')
                    .setEmoji('🔗')
                    .setStyle(ButtonStyle.Secondary))
                .addComponents(new ButtonBuilder()
                    .setLabel('Website')
                    .setEmoji('🌐')
                    .setURL('https://uplab.pro/')
                    .setStyle(ButtonStyle.Link))],
        });
        interaction.reply({ content:`messages sent to ${channel}`, ephemeral:true });
    });