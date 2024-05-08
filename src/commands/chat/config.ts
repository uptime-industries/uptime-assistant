import {
    ChannelType,
    PermissionFlagsBits
} from 'discord.js';
import { ChatInputCommand } from '../../Classes/index.js';
import { config } from '../../features/config/index.js';

export default new ChatInputCommand()
    .setBuilder((builder) => builder
        .setName('config')
        .setDescription('Update bot configs')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addSubcommandGroup((subcommandGroup) => subcommandGroup
            .setName('support')
            .setDescription('config support command')
            .addSubcommand((subcommand) => subcommand
                .setName('send')
                .setDescription('send support message')
                .addChannelOption((option) => option
                    .setName('channel')
                    .setDescription('Channel')
                    .setRequired(false)
                    .addChannelTypes(ChannelType.GuildText)
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName('role')
                .setDescription('Select support role to tag')
                .addRoleOption((option) => option
                    .setName('role')
                    .setDescription('Role wich will be pinged when a ticket is opened')
                    .setRequired(true))
            )
            .addSubcommand((subcommand) => subcommand
                .setName('set-other-role')
                .setDescription('Add other role that should be added to the support threads')
                .addRoleOption((option) => option
                    .setName('role')
                    .setDescription('Role witch to add to ticket is opened')
                    .setRequired(false))
            )
            .addSubcommand((subcommand) => subcommand
                .setName('embed')
                .setDescription('Set the text to be sent in the support embed')
            )
            .addSubcommand((subcommand) => subcommand
                .setName('color')
                .setDescription('Set the color of the support embed')
                .addStringOption((option) => option
                    .setName('color')
                    .setDescription('Color to witch to set the support embed')
                    .setMaxLength(6)
                )
            )
        )
    )
    .setExecute(config);
