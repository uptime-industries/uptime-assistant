import { ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMemberRoleManager, Locale, MessageActionRowComponentBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import i18n from './i18n';

/* eslint-disable no-shadow */
export enum Pronouns {
    He = '1074180916286607461',
    She = '1074181023161663589',
    They = '1074181112596791338',
    Any = '1074181217366327296',
    Ask = '1074181307669676053',
}

export enum Experience {
    Expert = '1074316016697495653',
    Pro = '1074316133424967740',
    Adv = '1074316225154383992',
    Learn = '1074316276459114549',
}
export enum Region {
    Africa = '1074365724363063316',
    Asia = '1074365811847856278',
    Eu = '1074365857280577548',
    Na = '1074365935659528312',
    Oc = '1074365989363384362',
    Sa = '1074366034640904367',
    Null = '1074366714751500338'
}
export function experienceMenue(locale:Locale, roles:GuildMemberRoleManager) {
    return new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(new StringSelectMenuBuilder()
            .setCustomId('roles_s')
            .setPlaceholder(i18n(locale, 'roles-skill-placeholder'))
            .setOptions(
                new StringSelectMenuOptionBuilder()
                    .setValue(Experience.Learn)
                    .setEmoji({ name:'📚' })
                    .setLabel(i18n(locale, 'roles-skill-learning'))
                    .setDescription(i18n(locale, 'roles-skill-learning-description'))
                    .setDefault(roles.cache.has(Experience.Learn)),
                new StringSelectMenuOptionBuilder()
                    .setValue(Experience.Adv)
                    .setEmoji({ name:'⌨️' })
                    .setLabel(i18n(locale, 'roles-skill-adv'))
                    .setDescription(i18n(locale, 'roles-skill-adv-description'))
                    .setDefault(roles.cache.has(Experience.Adv)),
                new StringSelectMenuOptionBuilder()
                    .setValue(Experience.Pro)
                    .setEmoji({ name:'🖥️' })
                    .setLabel(i18n(locale, 'roles-skill-pro'))
                    .setDescription(i18n(locale, 'roles-skill-pro-description'))
                    .setDefault(roles.cache.has(Experience.Pro)),
                new StringSelectMenuOptionBuilder()
                    .setValue(Experience.Expert)
                    .setEmoji({ name:'📡' })
                    .setLabel(i18n(locale, 'roles-skill-expert'))
                    .setDescription(i18n(locale, 'roles-skill-expert-description'))
                    .setDefault(roles.cache.has(Experience.Expert)),
            ));
}
export function pronounMenu(locale:Locale, roles:GuildMemberRoleManager) {
    return new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(new StringSelectMenuBuilder()
            .setCustomId('roles_p')
            .setPlaceholder(i18n(locale, 'pronoun'))
            .setMinValues(1)
            .setMaxValues(5)
            .setOptions(
                new StringSelectMenuOptionBuilder()
                    .setValue(Pronouns.He)
                    .setEmoji({ name:'❤️' })
                    .setLabel('He / Him')
                    .setDefault(roles.cache.has(Pronouns.He)),
                new StringSelectMenuOptionBuilder()
                    .setValue(Pronouns.She)
                    .setEmoji({ name:'💙' })
                    .setLabel('She / Her')
                    .setDefault(roles.cache.has(Pronouns.She)),
                new StringSelectMenuOptionBuilder()
                    .setValue(Pronouns.They)
                    .setEmoji({ name:'💚' })
                    .setLabel('They / Them')
                    .setDefault(roles.cache.has(Pronouns.They)),
                new StringSelectMenuOptionBuilder()
                    .setValue(Pronouns.Any)
                    .setEmoji({ name:'💛' })
                    .setLabel('Any Pronouns')
                    .setDefault(roles.cache.has(Pronouns.Any)),
                new StringSelectMenuOptionBuilder()
                    .setValue(Pronouns.Ask)
                    .setEmoji({ name:'🧡' })
                    .setLabel('Other / Ask')
                    .setDefault(roles.cache.has(Pronouns.Ask)),
            ),
        );
}
export function regionMenu(locale:Locale, roles:GuildMemberRoleManager) {
    return new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(new StringSelectMenuBuilder()
            .setCustomId('roles_r')
            .setPlaceholder(i18n(locale, 'roles-region-placeholder'))
            .setOptions(
                new StringSelectMenuOptionBuilder()
                    .setValue('1074365724363063316')
                    .setEmoji({ name:'⛵' })
                    .setLabel(i18n(locale, 'roles-region-africa'))
                    .setDescription(i18n(locale, 'roles-region-africa-description'))
                    .setDefault(roles.cache.has(Region.Africa)),
                new StringSelectMenuOptionBuilder()
                    .setValue('1074365811847856278')
                    .setEmoji({ name:'🚄' })
                    .setLabel(i18n(locale, 'roles-region-asia'))
                    .setDescription(i18n(locale, 'roles-region-asia-description'))
                    .setDefault(roles.cache.has(Region.Asia)),
                new StringSelectMenuOptionBuilder()
                    .setValue('1074365857280577548')
                    .setEmoji({ name:'🏗️' })
                    .setLabel(i18n(locale, 'roles-region-eu'))
                    .setDescription(i18n(locale, 'roles-region-eu-description'))
                    .setDefault(roles.cache.has(Region.Eu)),
                new StringSelectMenuOptionBuilder()
                    .setValue('1074365935659528312')
                    .setEmoji({ name:'🗺️' })
                    .setLabel(i18n(locale, 'roles-region-na'))
                    .setDescription(i18n(locale, 'roles-region-na-description'))
                    .setDefault(roles.cache.has(Region.Na)),
                new StringSelectMenuOptionBuilder()
                    .setValue('1074365989363384362')
                    .setEmoji({ name:'🏄' })
                    .setLabel(i18n(locale, 'roles-region-oc'))
                    .setDescription(i18n(locale, 'roles-region-oc-description'))
                    .setDefault(roles.cache.has(Region.Oc)),
                new StringSelectMenuOptionBuilder()
                    .setValue('1074366034640904367')
                    .setEmoji({ name:'🦜' })
                    .setLabel(i18n(locale, 'roles-region-sa'))
                    .setDescription(i18n(locale, 'roles-region-sa-description'))
                    .setDefault(roles.cache.has(Region.Sa)),
                new StringSelectMenuOptionBuilder()
                    .setValue('1074366714751500338')
                    .setEmoji({ name:'🐚' })
                    .setLabel(i18n(locale, 'roles-region-prefer'))
                    .setDescription(i18n(locale, 'roles-region-prefer-description'))
                    .setDefault(roles.cache.has(Region.Null)),
            ));
}
export function roleButton(locale:Locale, state:number) {
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents([
            new ButtonBuilder()
                .setCustomId('roles_skill')
                .setLabel(i18n(locale, 'experience'))
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('roles_pronoun')
                .setLabel(i18n(locale, 'pronoun'))
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('roles_region')
                .setLabel(i18n(locale, 'region'))
                .setStyle(ButtonStyle.Secondary),
        ]);
    row.components[state].setDisabled(true).setStyle(ButtonStyle.Primary);
    return row;
}