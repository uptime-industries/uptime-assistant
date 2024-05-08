import {
    ColorResolvable, Embed, EmbedBuilder, GuildMember,
    TimestampStyles
} from 'discord.js';

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
 *
 * @param data
 * @param embed
 * @param member
 */
export function closedTicketEmbed(embed: Embed, member: GuildMember) {
    const closedBy = `${member.displayName} at ${ (new Date).toDiscordString(TimestampStyles.ShortDateTime)}`;
    const newEmbed = new EmbedBuilder(embed.data)
        .setFields(
            {
                name: embed.fields[0].name,
                value: embed.fields[0].value,
                inline: true 
            },
            {
                name: embed.fields[1].name,
                value: '\`Closed\`', inline: true 
            }
        )
        .setTimestamp();
    return newEmbed;
}

/**
 *
 * @param embed
 * @param member
 */
export function reopenTicketEmbed(embed: Embed, member: GuildMember) {
    const reopenedBy = `${member.displayName} at ${ (new Date).toDiscordString(TimestampStyles.ShortDateTime)}`;
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
