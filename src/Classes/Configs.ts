import {
    Collection,
    ColorResolvable, ComponentEmojiResolvable,
    DiscordjsError,
    Events,
    Guild,
    Role,
    RoleResolvable,
    Snowflake,
    resolveColor
} from 'discord.js';

import fs from 'fs';
import { Client } from './Client/index.js';



class SupportSettings {

    private guildConfig: Config;

    
    public get guild(): Guild {
        return this.guildConfig.guild;
    }
    
    
    private _embedTitle: string = 'Support';
    
    public get embedTitle(): string {
        return this._embedTitle;
    }
    public setEmbedTitle(title: string) {
        this._embedTitle = title;
        return this;
    }

    private _embedDescription: string = 'We are here to help';
    
    public get embedDescription(): string {
        return this._embedDescription;
    }

    public setEmbedDescription(description: string) {
        this._embedDescription = description;
        return this;
    }

    private _embedColor?: number;
    
    public get embedColor(): number | undefined {
        return this._embedColor;
    }
    
    public setEmbedColor(color: ColorResolvable | undefined) {
        this._embedColor = color ? resolveColor(color) : undefined;
        return this;
    }

    private _buttonEmoji: ComponentEmojiResolvable = '📝';
    
    public get buttonEmoji(): ComponentEmojiResolvable {
        return this._buttonEmoji;
    }
    
    public setButtonEmoji(emoji: ComponentEmojiResolvable) {
        this._buttonEmoji = emoji;
        return this;
    }

    private _role?: Role;
    
    public get role(): Role | undefined {
        return this._role;
    }
    
    public setRole(role: RoleResolvable) {
        if (role) 
            this._role = this.guild.roles.resolve(role) || undefined;
        else 
            this._role = undefined;
        return this;
    }

    private _otherRole?: Role;
    
    public get otherRole(): Role | undefined {
        return this._otherRole;
    }
    
    public setOtherRole(role?: RoleResolvable) {
        if (role) 
            this._otherRole = this.guild.roles.resolve(role) || undefined;
        else 
            this._otherRole = undefined;
        return this;
    }

    public toJSON(): supportConfig  {
        return {
            title: this.embedTitle,
            description: this.embedDescription,
            color: this.embedColor,
            emoji: this.buttonEmoji,
            roleId: this.role?.id,
            otherRoleId: this.otherRole?.id
        };
    }

    constructor(guildConfig: Config, partial: Partial<supportConfig> = {}) {
        const {
            title, description, color, emoji, roleId, otherRoleId
        } = partial;
        this.guildConfig = guildConfig;
        if (title) this.setEmbedTitle(title);
        if (description) this.setEmbedDescription(description);
        if (color) this.setEmbedColor(color);
        if (emoji) this.setButtonEmoji(emoji);
        if (roleId) this.setRole(roleId);
        if (otherRoleId) this.setOtherRole(otherRoleId);
    }
}

interface serverConfig {
    guildId: Snowflake,
    support: supportConfig
}
interface supportConfig {
    title: string,
    description: string,
    color?: ColorResolvable,
    emoji: ComponentEmojiResolvable,
    roleId?: Snowflake,
    otherRoleId?: Snowflake

}

export class Config {
    
    readonly guild: Guild;
    
    public get client(): Client {
        return this.guild.client;
    }
    
    public get guildId(): string {
        return this.guild.id;
    }
    

    readonly support: SupportSettings;

    public toJSON() {
        return { 
            guildId: this.guildId,
            support: this.support.toJSON()
        };
    }
    constructor(guild: Guild, data?: serverConfig ) {
        this.guild = guild;
        if (data) this.support = new SupportSettings(this, data.support);
        else
            this.support = new SupportSettings(this);
    }

}

export class ConfigManager {
    readonly client: Client;

    private _filepath = './Configs.json';

    readonly cache = new Collection<Snowflake, Config>();
    
    /**
     * loadConfigs
     * @returns
     */
    public loadConfigs() {
        const jsonstring = fs.readFileSync(this._filepath, 'utf-8');
        try {
            const data = JSON.parse(jsonstring) as serverConfig[];
            data.map(async (sc) => this.cache.set(
                sc.guildId, new Config(
                    await this.client.guilds.fetch(sc.guildId), sc)));
        }
        catch (error) {
            if (error instanceof Error || error instanceof DiscordjsError)
                this.client.emit(Events.Error, error);
            else throw error;
        }
        return this;
    }
    public toJSON() {
        return this.cache.map((sc): serverConfig => {
            return {
                guildId: sc.guildId,
                support: sc.support.toJSON()
            };
        });
    }
    public saveConfigs(){
        fs.writeFile(this._filepath, JSON.stringify(this.toJSON(), null, '    '), (error) => {
            if(error)
                this.client.emit(Events.Error, error);
        });
    }
    
    public setConfigPath(path: string) {
        this._filepath = path;
        return this;
    }

    public create(guild: Guild){
        const config = new Config(guild);
        this.cache.set(guild.id, config);
        return config;
    }
    
    constructor(client: Client) {
        this.client = client;
    }
}
