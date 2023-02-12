import { ButtonInteraction, EmbedBuilder, GuildMemberRoleManager, InteractionReplyOptions, InteractionUpdateOptions } from 'discord.js';
import ExtendedClient from '../../classes/Client';
import i18n from '../../features/i18n';
import { experienceMenue, pronounMenu, regionMenu, roleButton } from '../../features/roles';
import { Button } from '../../interfaces';

const button:Button = {
    name:'roles',
    async execute(client, interaction) {
        const style = interaction.component.style,
            args = interaction.customId.split('_');
        let message:InteractionUpdateOptions | InteractionReplyOptions | undefined;

        switch (args[1]) {
        case 'skill':
            message = skill(client, interaction);
            break;
        case 'pronoun':
            message = pronoun(client, interaction);
            break;
        case 'region':
            message = region(client, interaction);
            break;
        default:
            break;
        }

        if (style == 3) {
            (message as InteractionReplyOptions).ephemeral = true;
            interaction.reply(message as InteractionReplyOptions);
        }
        else {
            interaction.update(message as InteractionUpdateOptions);
        }
    },
};
export default button;

function skill(client:ExtendedClient, interaction:ButtonInteraction):InteractionUpdateOptions | InteractionReplyOptions | undefined {
    if (!(interaction.member?.roles instanceof GuildMemberRoleManager)) { return; }
    return {
        embeds:[new EmbedBuilder()
            .setTitle(i18n(interaction.locale, 'roles-skill-title'))
            .setDescription(i18n(interaction.locale, 'roles-skill-description'))
            .setColor(client.config.colors.embed)],
        components:[
            experienceMenue(interaction.locale, interaction.member.roles),
            roleButton(interaction.locale, 0),
        ],
    };
}

function pronoun(client:ExtendedClient, interaction:ButtonInteraction): InteractionUpdateOptions | InteractionReplyOptions | undefined {
    if (!(interaction.member?.roles instanceof GuildMemberRoleManager)) { return; }
    return {
        embeds:[new EmbedBuilder()
            .setTitle(i18n(interaction.locale, 'roles-pro-title'))
            .setColor(client.config.colors.embed)],
        components:[
            pronounMenu(interaction.locale, interaction.member.roles),
            roleButton(interaction.locale, 1),
        ],
    };
}
function region(client:ExtendedClient, interaction:ButtonInteraction) {
    if (!(interaction.member?.roles instanceof GuildMemberRoleManager)) { return; }
    return {
        embeds:[new EmbedBuilder()
            .setTitle(i18n(interaction.locale, 'roles-region-title'))
            .setColor(client.config.colors.embed)],
        components:[regionMenu(interaction.locale, interaction.member.roles),
            roleButton(interaction.locale, 2),
        ],
    };
}