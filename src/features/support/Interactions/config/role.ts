import {
    APIRole,
    ChatInputCommandInteraction, Role
} from 'discord.js';
import { Config } from '../../../../Modal/Config.js';

/**
 * update role wich is pinged when new tikets are created
 * @param interaction interaction from command handler
 * @param role object from interacton role option
 */
export async function setRole(interaction: ChatInputCommandInteraction, role: Role | APIRole) {
    if (!interaction.inGuild()) return;

    const { guild, guildId } = interaction;
    const guildConfig = await Config.findOne({ guildId });

    if (!guildConfig){ 
        await interaction.reply({
            content: 'configs not setupcontact support for help',
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
    guildConfig.support.roleId = rRole.id;
    await guildConfig.save();

    await interaction.reply({
        content: `${rRole} will now be notified when new tickets are created`,
        ephemeral: true
    });
}
