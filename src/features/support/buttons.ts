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
 * Creates buttons for a new Ticket
 * @param emoji the Icon to display with the button
 * @returns Action Row for a New ticket
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
 * Creates an Action Row for new ticket reply
 * @param message the message from the thread
 * @returns Action Row for a New ticket reply
 */
export function messageLinkRow(message: Message) {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setURL(message.url)
            .setStyle(ButtonStyle.Link)
            .setLabel('Go to Message'));
}
