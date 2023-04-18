import { ActionRowBuilder, ButtonBuilder, Colors, Events, GuildMember, TextChannel } from 'discord.js';
import Event from '../classes/Event';
import { moderateUserButton, userEmbed } from '../features/inspect';

const welcomeChannelID = process.env.USE_JOIN_CHANNEL_ID;

export default new Event()
    .setName(Events.GuildMemberUpdate)
    .setOnce(false)
    .setExecute(execute);

async function execute(oldMember:GuildMember, newMember:GuildMember) {
    if (oldMember.pending && !newMember.pending) {
        memberJoin (oldMember, newMember);
    }
}

async function memberJoin(oldMember:GuildMember, newMember:GuildMember) {
    const channel = oldMember.guild.channels.cache.find((_c, k) => k == welcomeChannelID) as TextChannel;
    channel.send({
        embeds: [(await userEmbed(newMember, Colors.Green))
            .setTitle('Member Verified')
            .setDescription('Member was verified or agreed to the rules')
            .addFields(
                { name: 'More Info:', value:`${newMember}` },
            )
            .setTimestamp()],
        components: [new ActionRowBuilder<ButtonBuilder>()
            .addComponents(moderateUserButton(newMember.user))],
    });
}