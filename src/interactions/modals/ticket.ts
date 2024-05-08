import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType, EmbedBuilder, GuildMember, ModalSubmitInteraction, ThreadAutoArchiveDuration
} from 'discord.js';
import { Interaction } from '../../Classes/index.js';
import { serverConfigs } from '../../bot.js';

export default new Interaction<ModalSubmitInteraction>({ customIdPrefix: 'ticket' })
    .setRun(async (interaction: ModalSubmitInteraction) => {
        if (!interaction.inGuild()) return;
        const {
            guildId, fields, client, channel, user
        } = interaction;
        const config = serverConfigs.cache.get(guildId)?.support;

        const subject = fields.getTextInputValue('subject');
        const body = fields.getTextInputValue('body');

        if (channel?.type != ChannelType.GuildText){ 
            await interaction.reply({
                content: 'Can not create  message here',
                ephemeral: true
            });
            return; 
        }
        const thread = await channel.threads.create({
            name: subject,
            autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
            type: ChannelType.PrivateThread,
            reason: `Ticket was created by ${(interaction.member as GuildMember).displayName}`
        });
        const embed = new EmbedBuilder()
            .setTitle(subject)
            .setDescription(body)
            .setColor(config?.embedColor ? config?.embedColor : null)
            .setThumbnail((interaction.member as GuildMember).displayAvatarURL({ size: 512, forceStatic: true }));
        const close = new ButtonBuilder()
            .setCustomId(`support${client.splitCustomIDOn}close`)
            .setLabel('Close Ticket')
            .setStyle(ButtonStyle.Danger);
        await thread.send({
            content: `${interaction.user}${config?.role}`,
            embeds: [embed],
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(close)]
        }).then(async m => await m.edit(m.content + `${config?.otherRole ? config?.otherRole : ''}`));
        await interaction.reply({
            content: 'Ticket has been created ',
            ephemeral: true
        });


    });
