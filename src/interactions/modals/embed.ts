import { ModalSubmitInteraction } from 'discord.js';
import { Interaction } from '../../Classes/index.js';
import { serverConfigs } from '../../bot.js';

export default new Interaction<ModalSubmitInteraction>({ customIdPrefix: 'embed' })
    .setRun(async (interaction: ModalSubmitInteraction) => {
        if (!interaction.inGuild()) return;
        const {
            guildId, fields, client 
        } = interaction;
        const config = serverConfigs.cache.get(guildId);

        const title = fields.getTextInputValue('title');
        const description = fields.getTextInputValue('description');

        config?.support.setEmbedTitle(title).setEmbedDescription(description);

        serverConfigs.cache.set(guildId, config!);

        serverConfigs.saveConfigs();

        await interaction.reply({
            content: `Embed Text has been updated. send new message with </config support send:${client.application.commands.cache.find((c)=> c.name == 'config')?.id}>`,
            ephemeral: true
        });
    });
