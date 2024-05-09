import {
    APIRole,
    ChatInputCommandInteraction, Role
} from 'discord.js';
import { serverConfigs } from '../../../../bot.js';

/**
 * set a role witch will be added to a support thread without notification
 * @param interaction interaction from command handler
 * @param role object from interacton role option
 */
export async function setOtherRole(interaction: ChatInputCommandInteraction, role: Role | APIRole) {
    if (!interaction.inGuild()) return;

    const { guild, guildId } = interaction;
    const guildConfig = serverConfigs.cache.get(guildId);
    if (!guildConfig){ 
        await interaction.reply({
            content: 'configs not setup contact support for help',
            ephemeral: true
        });
        return;
    }
    
    let rRole: Role;
    if(role instanceof Role)
        rRole = role;
        
    else {
        const tRole = guild?.roles.resolve(role.id);
        if ( tRole == null){ 
            await interaction.reply({
                content: 'role missing',
                ephemeral: true
            });
            return;
        }
        
        rRole = tRole;
    }

    guildConfig.support.setOtherRole(rRole);
    serverConfigs.cache.set(guildId, guildConfig);
    serverConfigs.saveConfigs();

    await interaction.reply({
        content: `${role} will now be added to new tickets are created`,
        ephemeral: true
    });
}
