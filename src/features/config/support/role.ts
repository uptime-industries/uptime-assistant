import {
    APIRole, ChatInputCommandInteraction, Role
} from 'discord.js';
import { serverConfigs } from '../../../bot.js';

/**
 *
 * @param interaction
 * @param role
 */
export async function setRole(interaction: ChatInputCommandInteraction, role: Role | APIRole) {
    if (!interaction.inGuild()) return;

    const { guild, guildId } = interaction;
    const guildConfig = serverConfigs.cache.get(guildId);
    if (!guildConfig) 
        return interaction.reply({
            content: 'configs not setupcontact support for help',
            ephemeral: true
        });
    
    let rRole: Role;
    if(role instanceof Role)
        rRole = role;
        
    else {
        const tRole = guild?.roles.resolve(role.id);
        if ( tRole == null) 
            return interaction.reply({
                content: 'role missing',
                ephemeral: true
            });
        
        rRole = tRole;
    }
    guildConfig.support.setRole(rRole);

    serverConfigs.cache.set(interaction.guildId, guildConfig);

    serverConfigs.saveConfigs();

    return interaction.reply({
        content: `${role} will now be notified when new tickets are created`,
        ephemeral: true
    });
    
}

/**
 *
 * @param interaction
 * @param role
 */
export async function setOtherRole(interaction: ChatInputCommandInteraction, role: Role | APIRole) {
    if (!interaction.inGuild()) return;

    const { guild, guildId } = interaction;
    const guildConfig = serverConfigs.cache.get(guildId);
    if (!guildConfig) 
        return interaction.reply({
            content: 'configs not setupcontact support for help',
            ephemeral: true
        });
    
    let rRole: Role;
    if(role instanceof Role)
        rRole = role;
        
    else {
        const tRole = guild?.roles.resolve(role.id);
        if ( tRole == null) 
            return interaction.reply({
                content: 'role missing',
                ephemeral: true
            });
        
        rRole = tRole;
    }
    guildConfig.support.setOtherRole(rRole);

    serverConfigs.cache.set(interaction.guildId, guildConfig);

    serverConfigs.saveConfigs();

    return interaction.reply({
        content: `${role} will now be added to new tickets are created`,
        ephemeral: true
    });
}
