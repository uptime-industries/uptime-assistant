import {
    ActionRowBuilder, ButtonBuilder, ButtonStyle
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
