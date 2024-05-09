import {
    ActionRowBuilder, ButtonBuilder, ButtonStyle,
    ComponentEmojiResolvable,
    Message
} from 'discord.js';

export const closeTicket = new ButtonBuilder()
    .setCustomId(`close`)
    .setLabel('Close')
    .setStyle(ButtonStyle.Danger)
    .setEmoji('🔓');

// export const resolveTicket = new ButtonBuilder()
//     .setCustomId(`resolve`)
//     .setLabel('Resolve')
//     .setStyle(ButtonStyle.Success);

// export const unresolveTicket = new ButtonBuilder()
//     .setCustomId(`unresolve`)
//     .setLabel('Resolve')
//     .setStyle(ButtonStyle.Success);

export const reopenTicket = new ButtonBuilder()
    .setCustomId(`reopen`)
    .setLabel('Reopen')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🔒');

export const newTicketActionRow = new ActionRowBuilder<ButtonBuilder>()
    .setComponents(closeTicket);

export const closedTicketActionRow = new ActionRowBuilder<ButtonBuilder>()
    .setComponents(reopenTicket);

/**
 *
 * @param emoji
 * @returns
 */
export function newTicketRow(emoji: ComponentEmojiResolvable) {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setCustomId('ticket')
            .setLabel('Create a Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji(emoji));
}

/**
 * 
 * @param message
 * @returns
 */
export function messageLinkRow(message: Message) {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setURL(message.url)
            .setStyle(ButtonStyle.Link)
            .setLabel('Go to Message'));
}
