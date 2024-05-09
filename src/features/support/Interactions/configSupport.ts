import { ModalSubmitInteraction } from 'discord.js';
import { Interaction } from '../../../Classes/Interaction.js';
import { serverConfigs } from '../../../bot.js';

export const setEmbedText = new Interaction<ModalSubmitInteraction>({ customIdPrefix: 'embed' })
    .setRun(async (interaction: ModalSubmitInteraction) => {
        if (!interaction.inGuild()) return;

        const { guildId, fields } = interaction;
        const title = fields.getTextInputValue('title');
        const description = fields.getTextInputValue('description');
        const config = serverConfigs.cache.get(guildId);
        
        config?.support.setEmbedTitle(title);
        config?.support.setEmbedDescription(description);

        serverConfigs.cache.set(guildId, config!);

        serverConfigs.saveConfigs();
    
        await interaction.reply({
            content: `Embed color has been updated. Send new message with </config support send:${interaction.client.application.commands.cache.find((c)=> c.name == 'config')?.id}>`,
            ephemeral: true
        });
    });
