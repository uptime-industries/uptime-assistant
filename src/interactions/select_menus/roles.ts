import { GuildMember, Snowflake, StringSelectMenuInteraction } from 'discord.js';
import { Experience, experienceMenue, pronounMenu, Pronouns, Region, regionMenu } from '../../features/roles';
import { StringSelectMenu } from '../../interfaces';

const skill:Snowflake[] = [Experience.Learn, Experience.Adv, Experience.Pro, Experience.Expert],
    pronoun:Snowflake[] = [Pronouns.He, Pronouns.She, Pronouns.They, Pronouns.Any, Pronouns.Ask],
    region:Snowflake[] = [Region.Africa, Region.Asia, Region.Eu, Region.Na, Region.Oc, Region.Sa, Region.Null];

const selectmenu:StringSelectMenu = {
    name:'roles',
    async execute(_client, interaction) {
        let promis:Promise<GuildMember | undefined> | undefined = undefined,
            // eslint-disable-next-line @typescript-eslint/ban-types
            menu:Function | undefined;
        const args = interaction.customId.split('_');
        switch (args[1]) {
        case 's':
            promis = role(interaction.values, skill, interaction);
            menu = experienceMenue;
            break;
        case 'p':
            promis = role(interaction.values, pronoun, interaction);
            menu = pronounMenu;
            break;
        case 'r':
            promis = role(interaction.values, region, interaction);
            menu = regionMenu;
            break;
        default:
            break;
        }
        if (promis) {
            promis.then(member => {
                if (member && menu) {
                    interaction.update({
                        components:[menu(interaction.locale, member.roles), interaction.message.components[1]] });
                }
            });
        }

    },
};
async function role(newRoles:string[], list:string[], interaction:StringSelectMenuInteraction) {
    if (!(interaction.member instanceof GuildMember)) { return; }
    const old = list.filter(r => !newRoles.includes(r));
    return interaction.member.roles.remove(old).then(m => m.roles.add(newRoles));
}
export default selectmenu;