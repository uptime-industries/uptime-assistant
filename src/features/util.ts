import {
    APIInteractionGuildMember, Guild, GuildMember
} from 'discord.js';

/**
 * resolve APIInteractionGuildMember to guild member
 * @param member GuildMember or APIInteractionGuildMember
 * @param guild Guil to fetch form if Guild member is an api GuildMeber
 * @returns GuildMember
 */
export async function resolveMember(member: GuildMember | APIInteractionGuildMember, guild: Guild) {
    let guildMember: GuildMember;
    if( !(member instanceof GuildMember)) 
        guildMember = await guild?.members.fetch(member.user.id);
    
    else guildMember = member;
    return guildMember;
}
