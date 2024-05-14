import {
    ColorResolvable, Embed, EmbedBuilder, GuildMember
} from 'discord.js';
import { Document, Types } from 'mongoose';
import { IConfig } from '../../Modal/Config.js';

/**
 * Generates embed for tickets
 * @param subject embed titile
 * @param body embed description
 * @param color embed color
 * @param member member to get display url
 * @returns embed builder
 */
export function newTicketEmbed(subject: string, body: string, color: ColorResolvable | null = null, member: GuildMember ) {
    return new EmbedBuilder()
        .setTitle(subject)
        .setDescription(body)
        .setColor(color)
        .setFields(
            {
                name: 'Created By',
                value: member.displayName,
                inline: true 
            },
            {
                name: 'Status',
                value: '\`Open\`',
                inline: true
            }
        )
        .setTimestamp();
}

/**
 * Update embed to be closed
 * @param embed embed used as base for update
 * @returns embed builder
 */
export function closedTicketEmbed(embed: Embed) {
    return new EmbedBuilder(embed.data)
        .setFields(
            {
                name: embed.fields[0].name,
                value: embed.fields[0].value,
                inline: true 
            },
            {
                name: embed.fields[1].name,
                value: '\`Closed\`',
                inline: true 
            }
        )
        .setTimestamp();
}

/**
 * Update embed to be open
 * @param embed embed used as base for update
 * @returns embed builder
 */
export function reopenTicketEmbed(embed: Embed) {
    return new EmbedBuilder(embed.data)
        .setFields(
            {
                name: embed.fields[0].name,
                value: embed.fields[0].value,
                inline: true 
            },
            {
                name: embed.fields[1].name,
                value: '\`Open\`',
                inline: true 
            }
        )
        .setTimestamp();
}

/**
 * Generates new Ticket Embed
 * @param config Document from findOne
 * @returns New ticket embed builder
 */
export function sendEmbed(config: (Document<unknown, {}, IConfig> & IConfig & { _id: Types.ObjectId; }) | null) {
    return new EmbedBuilder()
        .setTitle(config?.support.title!)
        .setDescription(config?.support.description!)
        .setColor(config?.support.color != undefined ? config?.support.color : null);
}
