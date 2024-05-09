import { Guild } from 'discord.js';
import { Client } from '../Client/index.js';
import { SupportSettings } from './SupportSenttings.js';
import { serverConfig } from './interfaces.js';


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


export { SupportSettings };

