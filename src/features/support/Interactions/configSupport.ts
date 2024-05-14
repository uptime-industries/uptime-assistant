import { ModalSubmitInteraction } from 'discord.js';
import { Interaction } from '../../../Classes/Interaction.js';
import { Config } from '../../../Modal/Config.js';

export const setEmbedText = new Interaction<ModalSubmitInteraction>({ customIdPrefix: 'embed' })
    .setRun(async (interaction: ModalSubmitInteraction) => {
        if (!interaction.inGuild()) return;

        const { guildId, fields } = interaction;
        const title = fields.getTextInputValue('title');
        const description = fields.getTextInputValue('description');

        const guildConfig = await Config.findOne({ guildId });

        guildConfig!.support.title = title;
        guildConfig!.support.description = description;

        await guildConfig?.save();
    
        await interaction.reply({
            content: `Embed text has been updated. Send new message with </config support send:${interaction.client.application.commands.cache.find((c)=> c.name == 'config')?.id}>`,
            ephemeral: true
        });
    });
