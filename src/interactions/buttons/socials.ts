import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder } from 'discord.js';
import { Button } from '../../interfaces';

const button:Button = {
    name:'socials',
    async execute(_client, interaction) {
        interaction.reply({
            components:[new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .addComponents(new ButtonBuilder()
                    .setLabel('Twitter')
                    .setEmoji('1073843678159851521')
                    .setURL('https://twitter.com/Merocle')
                    .setStyle(ButtonStyle.Link))
                .addComponents(new ButtonBuilder()
                    .setLabel('Instagram')
                    .setEmoji('1073980493281894541')
                    .setURL('https://www.instagram.com/uptime.lab/')
                    .setStyle(ButtonStyle.Link))
                .addComponents(new ButtonBuilder()
                    .setLabel('Reddit')
                    .setEmoji('1073980466597728426')
                    .setURL('https://www.reddit.com/user/merocle')
                    .setStyle(ButtonStyle.Link))
                .addComponents(new ButtonBuilder()
                    .setLabel('YouTube')
                    .setEmoji('1067245118370889799')
                    .setURL('https://www.youtube.com/@uptimelab/featured')
                    .setStyle(ButtonStyle.Link))
                .addComponents(new ButtonBuilder()
                    .setLabel('Mastodon')
                    .setEmoji('1068316150758383707')
                    .setURL('https://techhub.social/@merocle')
                    .setStyle(ButtonStyle.Link)),
            new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .addComponents(new ButtonBuilder()
                    .setLabel('GitHub')
                    .setEmoji('1068315154141429850')
                    .setURL('https://github.com/merocle')
                    .setStyle(ButtonStyle.Link))
                .addComponents(new ButtonBuilder()
                    .setLabel('Thingiverse')
                    .setEmoji('1073983027333566527')
                    .setURL('https://www.thingiverse.com/merocle/designs')
                    .setStyle(ButtonStyle.Link))
                .addComponents(new ButtonBuilder()
                    .setLabel('TikTok')
                    .setEmoji('1073984322220077156')
                    .setURL('https://www.tiktok.com/@merocle')
                    .setStyle(ButtonStyle.Link))
                .addComponents(new ButtonBuilder()
                    .setLabel('Telegram')
                    .setEmoji('1073985222321901629')
                    .setURL('https://t.me/ASCII')
                    .setStyle(ButtonStyle.Link))],
            ephemeral:true,
        });
    },
};
export default button;