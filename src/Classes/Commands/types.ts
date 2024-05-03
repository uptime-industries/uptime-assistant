import {
    ChatInputCommandInteraction, CommandInteraction, ContextMenuCommandBuilder,
    ContextMenuCommandInteraction, InteractionResponse,
    Message, MessageContextMenuCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder,
    UserContextMenuCommandInteraction
} from 'discord.js';
import {
    BaseCommand, ChatInputCommand, ContextMenuCommand
} from './index.js';

export type builders = SlashCommandBuilder | ContextMenuCommandBuilder;

export type ReturnableInteraction = void | CommandInteraction | ContextMenuCommandInteraction | InteractionResponse<boolean> | Message<boolean>;

export type TypeCommand = BaseCommand<SlashCommandBuilder | ContextMenuCommandBuilder, ChatInputCommandInteraction | ContextMenuCommandInteraction>;

export type SlashCommandBuilders = SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

export type Commands = ChatInputCommand | ContextMenuCommands;

export type ContextMenuCommands = ContextMenuCommand<UserContextMenuCommandInteraction> | ContextMenuCommand<MessageContextMenuCommandInteraction>;
