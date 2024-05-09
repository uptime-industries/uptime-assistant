import {
    ButtonBuilder, ButtonStyle, codeBlock, ColorResolvable, EmbedBuilder, GuildMember, User
} from 'discord.js';

/**
 *
 * @param member
 * @param colors
 */
export async function userEmbed(member: GuildMember, colors: ColorResolvable) {
    const user = await member.user.fetch(true);
    const iconURL = member.displayAvatarURL({ forceStatic: true, size: 4096 });
    return new EmbedBuilder()
        .setAuthor({ name: member.user.tag, iconURL: iconURL })
        .setThumbnail(iconURL)
        .setColor(colors)
        .setFields({
            name: 'Nickname:',
            value: codeBlock(member.displayName),
            inline: true 
        }, {
            name: 'User ID:',
            value: codeBlock(member.id),
            inline: true 
        }, {
            name: 'Created at:',
            value: user.createdAt.toDiscordString('F'),
            inline: true 
        }, {
            name: 'Joined at:',
            value: member.joinedAt!.toDiscordString('F'),
            inline: true 
        })
        .setImage(user.bannerURL({ size: 1024 })!);
}

/**
 *
 * @param user
 */
export function moderateUserButton(user: User) {
    return new ButtonBuilder()
        .setCustomId(`moderatename${user.client.splitCustomIDOn}${user.id}`)
        .setLabel('Moderate Nickname')
        .setStyle(ButtonStyle.Danger);
}
