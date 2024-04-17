import { ActionRowBuilder, ButtonBuilder, ButtonInteraction } from 'discord.js';
import { Interaction } from '../../Classes/index.js';
import { moderateUserButton, userEmbed } from '../../features/inspect.js';

export default new Interaction<ButtonInteraction>()
    .setCustomIdPrefix('inspect')
    .setRun(inspect);

async function inspect(interaction: ButtonInteraction) {
    // console.log(interaction.customId);
    const member = await interaction.guild.members.fetch(interaction.customId.split(interaction.client.splitCustomIDOn)[1]);
    if (!member) {
        interaction.reply({
            content: 'User is no longer in the server',
            ephemeral: true,
        });
    }
    else {
        interaction.reply({
            embeds: [await userEmbed(member, '#2b2d31')],
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(moderateUserButton(member.user))],
            ephemeral: true,
        });
    }

}