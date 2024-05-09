import {
    ColorResolvable, ComponentEmojiResolvable,
    Snowflake
} from 'discord.js';

export interface serverConfig {
    guildId: Snowflake,
    support: supportConfig
}

export interface supportConfig {
    title: string,
    description: string,
    color?: ColorResolvable,
    emoji: ComponentEmojiResolvable,
    roleId?: Snowflake,
    otherRoleId?: Snowflake

}
