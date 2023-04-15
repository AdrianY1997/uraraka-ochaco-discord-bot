import { Client, ClientOptions, Collection } from 'discord.js';
import { CommandHandler } from "../Handler/Command";
import { CommandRegister } from '../Util/Register';
import { EventHandler } from '../Handler/Events';
import { CommandBuilder } from './Command';
import { CustomDistube } from './CustomDistube';
import SoundCloudPlugin from '@distube/soundcloud';
import SpotifyPlugin from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

export class CustomClient extends Client {

    public distube;
    public commands = new Collection<string, CommandBuilder>();

    constructor(options: ClientOptions) {
        super(options);
        this.distube = new CustomDistube(this, {
            leaveOnStop: true,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            plugins: [
                new SpotifyPlugin({
                    emitEventsAfterFetching: true
                }),
                new SoundCloudPlugin(),
                new YtDlpPlugin()
            ]
        })
        this.init();
    }

    private init() {
        this.loader()
        this.register()
    }

    private loader() {
        CommandHandler(this);
        EventHandler(this);
    }

    private register() {
        CommandRegister(this);
    }
}