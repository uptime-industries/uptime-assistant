import {
    ColorResolvable,
    ComponentEmojiResolvable,
    Guild,
    Role, RoleResolvable,
    resolveColor
} from 'discord.js';
import { Config } from './Config.js';
import { supportConfig } from './interfaces.js';

export class SupportSettings {

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
