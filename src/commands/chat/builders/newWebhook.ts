import { ChannelType, PermissionsBitField } from 'discord.js';
import { ChatInputCommand } from '../../../Client';

export default new ChatInputCommand()
    .setBuilder((builder) => builder
        .setName('new-webhook')
        .setDescription('Create new webhook')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
        .setDMPermission(false)
        .addChannelOption((option) => option
            .setName('channel')
            .setDescription('Target Channel')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)))
    .setGlobal(true)
    .setExecute(async (interaction) => {
        const channel = interaction.options.getChannel('channel', true, [ChannelType.GuildText]);
        channel.createWebhook({ name:'uptime' }).then(w => console.log(w));
        interaction.reply({ content:'new webhook made', ephemeral:true });
    });