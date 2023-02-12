import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageActionRowComponentBuilder, PermissionsBitField, SlashCommandBuilder, TextChannel } from 'discord.js';
import { kickstarterButton } from '../../features/buttons';
import { fallback } from '../../features/i18n';
import { ChatInputCommand } from '../../interfaces';

const command:ChatInputCommand = {
    options: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Welcome messages')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
        .setDMPermission(false)
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel where to send message')
            .setRequired(true)),
    global:true,
    async execute(client, interaction) {
        const channel = interaction.options.getChannel('channel', true);
        if (!(channel instanceof TextChannel)) { return; }
        await channel.send('https://cdn.discordapp.com/attachments/1014458643816661083/1073779941252022313/b681a17ca10c3fa31c05fa2b440e3640.png');
        await channel.send({
            embeds:[new EmbedBuilder()
                .setTitle('Welcome to the Uptime Lab Discord')
                .setDescription(fallback('welcome'))
                .setColor(client.config.colors.embed)],
            components:[new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .addComponents(new ButtonBuilder()
                    .setCustomId('rules')
                    .setLabel('Rules')
                    .setEmoji('📜')
                    .setStyle(ButtonStyle.Primary))
                .addComponents(new ButtonBuilder()
                    .setCustomId('roles_skill')
                    .setLabel('Roles')
                    .setEmoji('🛠️')
                    .setStyle(ButtonStyle.Success))
                .addComponents(new ButtonBuilder()
                    .setCustomId('socials')
                    .setLabel('Socials')
                    .setEmoji('🔗')
                    .setStyle(ButtonStyle.Secondary))
                .addComponents(new ButtonBuilder()
                    .setLabel('Website')
                    .setEmoji('🌐')
                    .setURL('https://uplab.pro/')
                    .setStyle(ButtonStyle.Link))
                .addComponents(kickstarterButton(interaction))],
        });
        interaction.reply({ content:`messages sent to ${channel}`, ephemeral:true });
    },
};
export default command;