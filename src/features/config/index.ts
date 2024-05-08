import { ChannelType, ChatInputCommandInteraction } from 'discord.js';
import {
    send, setColor, setOtherRole, setRole,
    updateMessage
} from './support/index.js';


/**
 * 
 * @param interaction
 */
export async function config(interaction: ChatInputCommandInteraction): Promise<void> {
    const {
        options, client, guild 
    } = interaction;
    // const subcommandGroup = options.getSubcommandGroup(true);
    const subcommand = options.getSubcommand(true);
    const colorRegExp = /^[0-9A-Fa-f]{6}$/i;
    switch (subcommand) {
        case 'send':
            const channel = options.getChannel('channel', false, [ChannelType.GuildText]) || undefined;
            await send(interaction, channel);
            break;
    
        case 'role':
            const role = options.getRole('role', true);
            await setRole(interaction, role);       
            break;
        case 'set-other-role':
            const otherRole = options.getRole('role', true);
            await setOtherRole(interaction, otherRole);
            break;
        case 'embed':
            await updateMessage(interaction);
            break;
        case 'color':
            const optionsColor = options.getString('color');
            if(optionsColor == null) await setColor(interaction);
            else if(colorRegExp.test(optionsColor.toLowerCase()))
                await setColor(interaction, `#${optionsColor}`); 
            
            else
                await interaction.reply({
                    content: `Color Parsing Error. please enter a color with the following format \`FFFFFF\``,
                    ephemeral: true
                });
            break;
        default:
            await interaction.reply({ 
                content: 'command not implemented',
                ephemeral: true 
            });
            break;
    }
}


