import Parser from 'rss-parser';
import { Client } from './Client';
import { EmbedBuilder } from 'discord.js';

const parser = new Parser();
// const webhookClient = new WebhookClient({ url: 'https://discordapp.com/api/webhooks/1106020579267584040/JsX0JYeT4WrltGbVxgm3Ry050nZ6l8NbUCb7g-HtLK50AIFm8o-NmmFfqSxqhzgwrOL0' });

// Initialize the previous item variable to null
let previousItemGuid: string[] | undefined;

function getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

async function handleNewRssItem(item: Parser.Item, avatarURL:string, client: Client) {
    const webhook = await client.fetchWebhook('1106038573792231455');
    const content = item.title.split(':');
    const embed = new EmbedBuilder()
        .setTitle('Stock Alert')
        .setDescription(content[1])
        .setColor('#d44e50')
        .setURL(item.link)
        .addFields(
            { name:'Location', value:`${getFlagEmoji(item.categories[1])}(${item.categories[1].toUpperCase()})`, inline:true },
            { name:'Vendor', value:item.categories[0], inline: true },
        )
        .setTimestamp(new Date(item.isoDate));
    webhook.send({
        username: 'rpilocator',
        avatarURL: avatarURL,
        embeds: [embed],
    });
}

export default async function checkForNewRSSItem(client: Client) {
    // Parse the RSS feed
    const feed = await parser.parseURL('https://rpilocator.com/feed/?cat=CM4');

    // Get the latest item from the RSS feed
    const latestItem = feed.items[0];

    // Check if the latest item is different from the previous one
    // console.log(latestItem, previousItemGuid);
    if (previousItemGuid.includes(latestItem.guid)) {

        // If it is, call the function to handle the new item
        handleNewRssItem(latestItem, feed.image.url, client);

        // Update the previous item to the latest one
        previousItemGuid = feed.items.map((item) => item.guid);
    }
    return;
}
