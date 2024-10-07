import {
    ApplicationCommandType,
    DiscordAPIError, Events, Interaction,
    InteractionType
} from 'discord.js';
import { Event } from '../Classes/index.js';
import { Config } from '../Modal/Config.js';

/**
 * Handles the creation of a new interaction.
 * @param interaction - The interaction object.
 */
async function onInteractionCreate(interaction: Interaction) {
    const { client, type } = interaction;

    if (interaction.inGuild()) {
        const { guild, guildId } = interaction;
        const guildConfig = await Config.findOne({ guildId: guildId });
        if (!guildConfig) {
            await Config.create({
                guildId: guildId,
                name: guild?.name
            });
        }
        else if (guildConfig.name !== guild?.name) {
            await guildConfig.updateOne({ name: guild?.name });
        }
    }

    const {
        commands, interactions, errorMessage, replyOnError
    } = client;

    try {
        switch (type) {
            case InteractionType.ApplicationCommandAutocomplete:
                // If the interaction is an autocomplete request, handle autocomplete
                await commands.runAutocomplete(interaction);
                break;
            case InteractionType.ModalSubmit:
                // If the interaction is a modal submit interaction, execute the corresponding modal submit handler
                await interactions.runModal(interaction);
                break;
            case InteractionType.ApplicationCommand:

                switch (interaction.commandType) {
                    case ApplicationCommandType.ChatInput:
                        // If the interaction is a chat input command, execute the corresponding command
                        await commands.runChatCommand(interaction);
                        break;
                    case ApplicationCommandType.User:
                        // If the interaction is a user context menu command, execute the corresponding command
                        await commands.runUserContextMenus(interaction);
                        break;
                    case ApplicationCommandType.Message:
                        // If the interaction is a message context menu command, execute the corresponding command
                        await commands.runMessageContextMenus(interaction);
                        break;
                    default:
                        break;
                }
                break;

            case InteractionType.MessageComponent:
                // If the interaction is a button interaction, execute the corresponding button handler
                if (interaction.isButton()) {
                    await interactions.runButton(interaction);
                }
                
                // If the interaction is a select menu interaction, execute the corresponding select menu handler
                else if (interaction.isAnySelectMenu()) {
                    await interactions.runSelectMenus(interaction);
                }
                break;
            default:
                break;
        }
    }
    catch (error) {
        
        if (error instanceof DiscordAPIError || error instanceof Error) {
            client.emit(Events.Error, error);
        }
        else {
            throw error;
        }

        // If the interaction is repliable, handle the error with a reply
        if (interaction.isRepliable() && error instanceof Error) {
        
            if (!replyOnError) return;
        
            // If the interaction is deferred, follow up with an ephemeral error message
            if (interaction.deferred) {
                await interaction.followUp({ content: errorMessage, ephemeral: true }).catch((e) => client.emit(Events.Error, e));
            }
            // If the interaction is not deferred, reply with an ephemeral error message
            else {
                await interaction.reply({ content: errorMessage, ephemeral: true }).catch((e) => client.emit(Events.Error, e));
            }

        }
        
    }
}

export default new Event({
    name: Events.InteractionCreate,
    once: false,
    execute: onInteractionCreate
});
