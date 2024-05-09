import { ChatInputCommandInteraction } from 'discord.js';
import { configSupport } from '../support/Interactions/config/index.js';


/**
 * command to handle config command
 * @param interaction command interaction
 */
export async function config(interaction: ChatInputCommandInteraction): Promise<void> {
    const {
        options, client, guild 
    } = interaction;
    const subcommandGroup = options.getSubcommandGroup();
    if (subcommandGroup) 
        switch (subcommandGroup) {
            case 'support':
                await configSupport(interaction);
                break;
        
            default:
                break;
        }
    
}


