import {
    ButtonInteraction,
    ChannelType,
    ModalSubmitInteraction, ThreadAutoArchiveDuration
} from 'discord.js';
import { Interaction } from '../../../Classes/index.js';
import { Config } from '../../../Modal/Config.js';
import { resolveMember } from '../../util.js';
import { messageLinkRow, newTicketActionRow } from '../buttons.js';
import { newTicketEmbed } from '../embeds.js';
import { createTicket } from '../modals.js';

export const createButton = new Interaction<ButtonInteraction>({ customIdPrefix: 'ticket' })
    .setRun(async (interaction: ButtonInteraction) => {
        return interaction.showModal(createTicket);
    });

export const createModal = new Interaction<ModalSubmitInteraction>({ customIdPrefix: 'ticket' })
    .setRun(async (interaction: ModalSubmitInteraction) => {
        if (!interaction.inGuild()) return;
        const {
            guild, guildId, fields, channel, member
        } = interaction;
        
        if (channel?.type != ChannelType.GuildText){ 
            await interaction.reply({
                content: 'Can not create  message here',
                ephemeral: true
            });
            return; 
        }
        interaction.deferReply({ ephemeral: true });

        const guildConfig = await Config.findOne({ guildId });
        const supportRole = guild?.roles.cache.get(guildConfig?.support.roleId!);
        const otherRole = guildConfig?.support.otherRoleId ? guild?.roles.cache.get(guildConfig?.support.otherRoleId) : undefined;
        const subject = fields.getTextInputValue('subject');
        const body = fields.getTextInputValue('body');
        const guildMember = await resolveMember(member, guild!);

        const thread = await channel.threads.create({
            name: subject,
            autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
            type: ChannelType.PrivateThread,
            reason: `Ticket was created by ${guildMember.displayName}`
        });
        
        const message = await thread.send({
            content: `${interaction.user}${supportRole}`,
            embeds: [newTicketEmbed(subject, body, guildConfig?.support.color, guildMember)],
            components: [newTicketActionRow]
        });
        await interaction.followUp({
            content: 'Ticket has been created ',
            ephemeral: true,
            components: [messageLinkRow(message)]
        });
        await message.edit({ content: message.content + `${otherRole ? otherRole : ''}` });
    });
