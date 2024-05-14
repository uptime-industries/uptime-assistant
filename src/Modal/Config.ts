import {
    ColorResolvable, ComponentEmojiResolvable, Snowflake
} from 'discord.js';
import {
    HydratedDocument,
    Model, Schema,
    model
} from 'mongoose';

export interface IConfig{
    guildId: Snowflake
    name: string
    support: {
        title: string
        description: string
        color?: ColorResolvable
        emoji: ComponentEmojiResolvable
        roleId?: Snowflake,
        otherRoleId?: Snowflake
    }
}

type ConfigHydratedDocument = HydratedDocument<IConfig>;

export type ConfigModel = Model<IConfig, {}, {}, {}, ConfigHydratedDocument>;


const ConfigScheama = new Schema<IConfig, ConfigModel>(
    {
        guildId: {
            type: String,
            require: true,
            unique: true
        },
        name: {
            type: String,
            require: true
        },
        support: {
            title: {
                type: String,
                require: true,
                default: 'Support'
            },
            description: {
                type: String,
                require: true,
                default: 'We are here to help'
            },
            color: {
                type: String,
                required: false 
            },
            emoji: {
                type: String,
                require: true,
                default: '📝'
            },
            roleId: String,
            otherRoleId: String
        }
    },
    { timestamps: true }
);

export const Config = model<IConfig, ConfigModel>('config', ConfigScheama);
