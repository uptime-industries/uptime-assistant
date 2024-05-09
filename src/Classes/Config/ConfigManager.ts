import {
    Client, Collection,
    DiscordjsError, Events, Guild,
    Snowflake
} from 'discord.js';
import fs from 'fs';
import { Config } from './Config.js';
import { serverConfig } from './interfaces.js';

export class ConfigManager {
    readonly client: Client;

    private _filepath = './Configs.json';

    readonly cache = new Collection<Snowflake, Config>();
    
    /**
     * loadConfigs
     * @returns The modified object
     */
    public loadConfigs() {
        const jsonstring = fs.readFileSync(this._filepath, 'utf-8');
        try {
            const data = JSON.parse(jsonstring) as serverConfig[];
            data.map(async (sc) => this.cache.set(sc.guildId, new Config(await this.client.guilds.fetch(sc.guildId), sc)));
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
