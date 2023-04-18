import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, DiscordAPIError, bold } from 'discord.js';
import { Interaction } from '../../classes/Interaction';

export default new Interaction<ButtonInteraction>()
    .setName('moderatename')
    .setExecute(async (interaction) => {
        const args = interaction.customId.split('_');
        // console.log(args);
        const isY = args[1] == 'y';
        const isN = args[1] == 'n';
        const targetID = isY || isN ? args[2] : args[1];
        const member = await interaction.guild.members.fetch(targetID);
        // console.log(interaction.customId);
        if (!member) {
            interaction.reply({
                content: 'User is no longer in the server',
                ephemeral: true,
            });
        }
        else if (isY) {
            member.setNickname('Nickname moderated', `${interaction.user.tag} moderated ${member.user.tag}'s nickname formarly ${member.nickname}`)
                .then(() => interaction.reply({
                    content: `${member}'s nickname has been moderated`,
                    ephemeral:true }))
                .catch((err) => {
                    if (!(err instanceof DiscordAPIError)) {
                        console.error(err);
                        return;
                    }
                    else if (err.code == 50013) {
                        interaction.update({
                            content:`Bot does not have permissions to moderate the nickname of ${member}`,
                            components: [],
                        });
                    }
                });
        }
        else if (isN) {
            interaction.update({
                content:'Action Cancelled',
                components: [],
            });
        }
        else {
            interaction.reply({
                content:bold(`Are you sure you would like to moderate the nickname of ${member}`),
                components: [new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(new ButtonBuilder()
                        .setCustomId(interaction.customId.replace('_', '_y_'))
                        .setLabel('Yes')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(interaction.customId.replace('_', '_n_'))
                        .setLabel('No')
                        .setStyle(ButtonStyle.Danger))],
                ephemeral:true,
            });
        }
    });

