import {
    AllowedMentionsTypes, ButtonInteraction, ThreadAutoArchiveDuration
} from 'discord.js';
import { Interaction } from '../../../Classes/index.js';
import { Config } from '../../../Modal/Config.js';
import { closedTicketActionRow, newTicketActionRow } from '../buttons.js';
import { closedTicketEmbed, reopenTicketEmbed } from '../embeds.js';

export const closeTicket = new Interaction<ButtonInteraction>({ customIdPrefix: 'close' })
    .setRun(async (interaction: ButtonInteraction) => {
        const { channel, message } = interaction;
        if(!channel?.isThread()) {
            await interaction.reply({
                content: 'How are you seeing this please let mafia know',
                ephemeral: true
            });
            return;
        }
        await interaction.reply({ content: 'This ticket has been closed.' });

        await message.edit({
            embeds: [closedTicketEmbed(message.embeds[0])],
            components: [closedTicketActionRow]
        });
        channel.setAutoArchiveDuration(ThreadAutoArchiveDuration.OneDay);
        channel.setArchived(true);
    });

export const reopenTicket = new Interaction<ButtonInteraction>({ customIdPrefix: 'reopen' })
    .setRun(async (interaction: ButtonInteraction) => {
        const {
            channel, message, guild, guildId
        } = interaction;
        // const guildMember = await resolveMember(member!, guild!);
        if(!channel?.isThread()) {
            await interaction.reply({
                content: 'How are you seeing this please let mafia know',
                ephemeral: true
            });
            return;
        }

        const guildConfig = await Config.findOne({ guildId });
        const supportRole = guild?.roles.cache.get(guildConfig?.support.roleId);

        await interaction.reply({ content: `${supportRole}, This Ticket has be reopened`, allowedMentions: { parse: [AllowedMentionsTypes.Role] } });

        await message.edit({
            embeds: [reopenTicketEmbed(message.embeds[0])],
            components: [newTicketActionRow]
        });

        await channel.setArchived(false);
    });
