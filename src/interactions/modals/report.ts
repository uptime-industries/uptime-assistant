import {
    ActionRowBuilder,
    AnyThreadChannel,
    ButtonBuilder,
    ButtonStyle,
    Colors, EmbedBuilder,
    Events,
    GuildMember,
    Message,
    ModalSubmitInteraction, Snowflake,
    TimestampStyles
} from 'discord.js';
import { Client, Interaction } from '../../Classes/index.js';

const reportChannelID = process.env.REPORT_CHANNEL_ID;
const defaultComment = 'No Additional Comment';

export default new Interaction<ModalSubmitInteraction>()
    .setCustomIdPrefix('report')
    .setRun(execute);


/**
 *
 * @param interaction
 */
async function execute(interaction: ModalSubmitInteraction) {
    
    interaction.reply({ content: 'Your report has been recived and will be reviewed', ephemeral: true });
   
    const {
        client, guild, fields, member
    } = interaction;
    const { splitCustomIDOn } = client;
    if (!interaction.inGuild() || guild == null || !(member instanceof GuildMember)) return;

    const reportChannel = guild.channels.cache.find<AnyThreadChannel>((c, k): c is AnyThreadChannel => k == reportChannelID && c.isThread());
    const args = splitCustomIDOn == undefined ? [interaction.customId] : interaction.customId.split(splitCustomIDOn);
    let comment: string | undefined = fields.getTextInputValue('comment');
    if (comment.length == 0) comment = undefined;

    const embeds: EmbedBuilder[] = [];

    if ( args[1] === 'm') {
        const channel = await guild.channels.fetch(args[2]);
        if (!channel?.isTextBased()) return;
        const message = await channel.messages.fetch(args[3]);
        embeds.push(messageReportEmbed(member, message, comment ));
    }
    else if (args[1] == 'u'){
        const target = await guild.members.fetch(args[2]);
        embeds.push(userReportEmbed(member, target, comment));
    }
    reportChannel?.send({ embeds: embeds, components: [reportRow(args[2], client)] }).catch((e) => client.emit(Events.Error, e));
}


/**
 *
 * @param reporter
 * @param target
 * @param comment
 */
function userReportEmbed(reporter: GuildMember, target: GuildMember, comment: string = defaultComment){
    return new EmbedBuilder()
        .setTitle('User Report')
        .setThumbnail(target.displayAvatarURL({ forceStatic: true, size: 4096 }))
        .addFields(
            {
                name: 'Reported', value: `${target}`, inline: true 
            }, {
                name: 'Reported By', value: `${reporter}`, inline: true 
            }, { name: 'Comment', value: comment })
        .setColor(Colors.Red);
}

/**
 *
 * @param reporter
 * @param message
 * @param comment
 */
function messageReportEmbed(reporter: GuildMember, message: Message, comment: string = defaultComment) {
    const target = message.member;
    return new EmbedBuilder()
        .setTitle('Message Report')
        .setThumbnail(target!.displayAvatarURL({ forceStatic: true, size: 1024 }))
        .setFields(
            {
                name: 'Channel', value: message.channel.toString(), inline: true 
            }, {
                name: 'Date Posted', value: message.createdAt.toDiscordString(TimestampStyles.LongDateTime), inline: true 
            }, { name: 'Content of Message', value: message.content }, {
                name: 'Reported', value: target!.toString(), inline: true 
            }, {
                name: 'Reported By', value: reporter.toString(), inline: true 
            }, { name: 'Comment', value: comment })
        .setColor(Colors.Red);
}

/**
 *
 * @param id
 * @param client
 * @param message
 */
function reportRow(id: Snowflake, client: Client, message?: Message) {
    const { splitCustomIDOn } = client;
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(instpct.setCustomId(`inspect${splitCustomIDOn}${id}`));
    if (message) 
        return row.addComponents(link.setURL(message.url));
    
    else 
        return row;
}

const instpct = new ButtonBuilder()
    .setLabel('Inspect User')
    .setEmoji('🔎')
    .setStyle(ButtonStyle.Secondary);
const link = new ButtonBuilder()
    .setLabel('Link to Message')
    .setEmoji('🔗')
    .setStyle(ButtonStyle.Link);

