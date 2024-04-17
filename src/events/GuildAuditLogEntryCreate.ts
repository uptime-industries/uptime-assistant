import { AuditLogEvent, Colors, EmbedBuilder, Events, Guild, GuildAuditLogsEntry, ThreadChannel, User } from 'discord.js';
import { Event } from '../Classes/index.js';

const channelID = process.env.USER_WELCOME_CHANNEL_ID;
const timeoutChannelID = process.env.TIMEOUT_CHANNEL_ID;

export default new Event()
    .setName(Events.GuildAuditLogEntryCreate)
    .setExecute(execute);

async function execute(auditLogEntry:GuildAuditLogsEntry, guild:Guild) {
    const LeaveChannel = guild.channels.cache.find((_c, k) => k == channelID) as ThreadChannel;
    // const executor = auditLogEntry.executor;
    const target = auditLogEntry.target;
    const change = auditLogEntry.changes;
    // console.log(auditLogEntry);
    if (auditLogEntry.action == AuditLogEvent.MemberBanAdd && (target instanceof User)) {
        const avatarURL = target.avatarURL({ forceStatic: true });
        console.log(auditLogEntry);
        LeaveChannel.send({
            embeds:[
                new EmbedBuilder()
                    .setAuthor({ name: target.tag, iconURL: (avatarURL || undefined) })
                    .setTitle('Member Banned')
                    .addFields(
                        { name: 'Banned By', value: `<@${auditLogEntry.executorId}>`, inline: true },
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        { name: 'Reason', value: auditLogEntry.reason!, inline: true })
                    .setThumbnail(avatarURL)
                    .setColor(Colors.Red)
                    .setTimestamp(auditLogEntry.createdAt),
            ],
        });
    }
    else if (auditLogEntry.action == AuditLogEvent.MemberKick && (target instanceof User)) {
        const avatarURL = target.avatarURL({ forceStatic: true });
        LeaveChannel.send({
            embeds:[
                new EmbedBuilder()
                    .setAuthor({ name: target.tag, iconURL: (avatarURL || undefined) })
                    .setTitle('Member Kicked')
                    .setFields(
                        { name: 'Kicked By', value: `<@${auditLogEntry.executorId}>`, inline: true },
                        // { name: 'Reason', value: auditLogEntry.reason, inline: true },
                    )
                    .setThumbnail(avatarURL)
                    .setColor(Colors.Red)
                    .setTimestamp(auditLogEntry.createdAt),
            ],
        });
    }
    else if (auditLogEntry.action == AuditLogEvent.MemberUpdate
        && change[0].key == 'communication_disabled_until'
        && (target instanceof User)
        // && auditLogEntry.executorId != guild.client.user.id
    ) {
        const timeoutChannel = guild.channels.cache.find((_c, k) => k == timeoutChannelID) as ThreadChannel;
        const avatarURL = target.avatarURL({ forceStatic: true });

        const newDate = change[0].new ? new Date((change[0].new as string)) : new Date();
        // const oldDate = change[0].old ? new Date((change[0].old as string)) : undefined;
        const title = 'Member Timed Out';
        const color = Colors.LuminousVividPink;
        const reason = auditLogEntry.reason || 'No Reason Given';
        // console.log(auditLogEntry, newDate, oldDate);
        timeoutChannel.send({
            embeds:[
                new EmbedBuilder()
                    .setAuthor({ name: target.tag, iconURL: (avatarURL || undefined) })
                    .setTitle(title)
                    .addFields(
                        { name: 'Action By', value:`<@${auditLogEntry.executorId}>`, inline:true },
                        { name: 'Expires At', value: `${newDate.toDiscordString('F')}\n ${newDate.toDiscordString('R')}`, inline:true },
                        { name: 'Reason', value:reason },
                    )
                    .setColor(color)
                    .setThumbnail(avatarURL)
                    .setTimestamp(auditLogEntry.createdAt),
            ],
        });
    }
}