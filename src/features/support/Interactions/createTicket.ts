import {
    ButtonInteraction,
    ChannelType,
    ModalSubmitInteraction, ThreadAutoArchiveDuration
} from 'discord.js';
import { Interaction } from '../../../Classes/index.js';
import { serverConfigs } from '../../../bot.js';
import { resolveMember } from '../../util.js';
import { newTicketActionRow } from '../buttons.js';
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
        const config = serverConfigs.cache.get(guildId)?.support;
        const subject = fields.getTextInputValue('subject');
        const body = fields.getTextInputValue('body');
        const guildMember = await resolveMember(member, guild!);

        const thread = await channel.threads.create({
            name: subject,
            autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
            type: ChannelType.PrivateThread,
            reason: `Ticket was created by ${guildMember.displayName}`
        });
        
        await thread.send({
            content: `${interaction.user}${config?.role}`,
            embeds: [newTicketEmbed(subject, body, config?.embedColor, guildMember)],
            components: [newTicketActionRow]
        }).then(async m => await m.edit(m.content + `${config?.otherRole ? config?.otherRole : ''}`));

        await interaction.followUp({
            content: 'Ticket has been created ',
            ephemeral: true
        });


    });
