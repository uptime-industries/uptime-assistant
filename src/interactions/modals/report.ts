import { ActionRowBuilder, bold, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, GuildMember, Message, MessageCreateOptions, ModalSubmitInteraction, Snowflake, TextChannel, ThreadChannel } from 'discord.js';
import { Interaction, timeFormate } from '../../Client';

const reportChannelID = process.env.REPORT_CHANNEL_ID;

export default new Interaction<ModalSubmitInteraction>()
    .setName('report')
    .setExecute(execute);


async function execute(interaction:ModalSubmitInteraction) {
    interaction.reply({ content: 'Your report has been recived and will be reviewed', ephemeral: true });
    const channel = interaction.guild?.channels.cache.find((_c, k) => k == reportChannelID) as ThreadChannel;
    const args = interaction.customId.split('_');
    let message:MessageCreateOptions = { content: bold('Error') };
    switch (args[1]) {
    case 'm':
        message = await MessageReport(interaction, args);
        break;
    case 'u':
        message = userReport(interaction, args);
        break;
    default:
        break;
    }
    channel.send(message).catch((e) => console.error(e));
}


function userReport(interaction:ModalSubmitInteraction, args: string[]):MessageCreateOptions {
    const member = interaction.guild?.members.cache.find((_m, k) => k == args[2]);
    const comment = interaction.fields.getTextInputValue('comment') || 'No Additional Comment';
    if (!(member instanceof GuildMember)) {
        console.error('[Error] Member not found during report');
        return { content: 'Error Contact Maintainer' };
    }
    const embed = new EmbedBuilder()
        .setTitle('User Report')
        .setThumbnail(member.displayAvatarURL({ forceStatic:true, size: 4096 }))
        .addFields(
            { name: 'Reported', value: `${member}`, inline: true },
            { name: 'Reported By', value: `${interaction.member}`, inline: true },
            { name: 'Comment', value: comment })
        .setColor(Colors.Red);
    return { embeds: [embed], components: [reportRow(args[2])] };
}

async function MessageReport(interaction:ModalSubmitInteraction, args: string[]):Promise<MessageCreateOptions> {
    const channel = interaction.guild?.channels.cache.find((_m, k) => k == args[2]) as TextChannel;
    const message = channel.messages.cache.find((_m, k) => k == args[3]);
    if (!message) {
        console.error('[Error] message not found during report');
        return { content: 'Error Contact Maintainer' };
    }
    const member = await interaction.guild?.members.fetch(message?.author.id);
    const comment = interaction.fields.getTextInputValue('comment') || 'No Additional Comment';
    const embed = new EmbedBuilder()
        .setTitle('Message Report')
        .setThumbnail(member?.displayAvatarURL({ forceStatic:true, size: 1024 }) || member?.user.avatarURL({ forceStatic: true, size: 1024 }) || null)
        .setFields(
            { name: 'Channel', value: `${channel}`, inline: true },
            { name: 'Date Posted', value: timeFormate(message.createdAt, 'F'), inline: true },
            { name: 'Content of Message', value: message.content },
            { name: 'Reported', value: `${member}`, inline: true },
            { name: 'Reported By', value: `${interaction.member}`, inline: true },
            { name: 'Comment', value: comment })
        .setColor(Colors.Red);
    return { embeds: [embed], components: [reportRow(message.author.id, message)] };
}

function reportRow(id:Snowflake, message?:Message) {
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(instpct.setCustomId(`inspect_${id}`));
    if (message) {
        return row.addComponents(link.setURL(message.url));
    }
    else {
        return row;
    }
}

const instpct = new ButtonBuilder()
    .setLabel('Inspect User')
    .setEmoji('🔎')
    .setStyle(ButtonStyle.Secondary);
const link = new ButtonBuilder()
    .setLabel('Link to Message')
    .setEmoji('🔗')
    .setStyle(ButtonStyle.Link);