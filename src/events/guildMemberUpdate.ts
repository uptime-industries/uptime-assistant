import {
    ActionRowBuilder, ButtonBuilder, Colors, Events, GuildMember, GuildTextBasedChannel
} from 'discord.js';
import { Event } from '../Classes/index.js';
import { moderateUserButton, userEmbed } from '../features/inspect.js';

const welcomeChannelID = process.env.USE_JOIN_CHANNEL_ID;

export default new Event()
    .setName(Events.GuildMemberUpdate)
    .setOnce(false)
    .setExecute(async (oldMember: GuildMember, newMember: GuildMember) => {
        if (oldMember.pending && !newMember.pending) {
            memberJoin(oldMember, newMember);
        }
    });

/**
 * Function triggers on when a member is verified
 * @param oldMember - old member state
 * @param newMember - new member state
 */
async function memberJoin(oldMember: GuildMember, newMember: GuildMember) {
    const channel = oldMember.guild.channels.cache.find<GuildTextBasedChannel>((c, k): c is GuildTextBasedChannel => k == welcomeChannelID && c.isTextBased());
    if (channel !== undefined) {
        channel.send({
            embeds: [(await userEmbed(newMember, Colors.Green))
                .setTitle('Member Verified')
                .setDescription('Member was verified or agreed to the rules')
                .addFields({ name: 'More Info:', value: `${newMember}` })
                .setTimestamp()],
            components: [new ActionRowBuilder<ButtonBuilder>()
                .addComponents(moderateUserButton(newMember.user))]
        });
    }
}
