import { EmbedBuilder, Colors } from 'discord.js';
import { Queue, Song } from 'distube';
import { PlayerInfo, PlayerQueue, configVariablesTypes } from './types';

export const PLAYER_INFO = async (data: PlayerInfo) => {
    if (data.isNew) {
        return new EmbedBuilder()
            .setColor(Colors.LuminousVividPink)
            .setAuthor({
                name: `Reproductor de música`,
                iconURL: "https://cdn-icons-png.flaticon.com/512/2995/2995101.png"
            })
            .setDescription("No hay música en reproducción actualmente")
            .setImage("https://i.imgur.com/xLUJbzD.jpeg")
    }

    return new EmbedBuilder()
        .setColor(Colors.LuminousVividPink)
        .setAuthor({
            name: `${data.song?.name?.substring(0, 25)}...`,
            url: data.song?.url,
            iconURL: "https://cdn-icons-png.flaticon.com/512/2995/2995101.png"
        })
        .setFields([
            {
                name: `Duración:`,
                value: `${data.song?.formattedDuration}`,
                inline: true
            },
            {
                name: `Total:`,
                value: `${data.queue?.formattedDuration}`,
                inline: true
            },
            {
                name: `Fuente:`,
                value: `${data.song?.source}`,
                inline: true
            },
            {
                name: `Estado`,
                value: `${data.queue?.paused ? "Pausado" : "Reproduciendo"}`,
                inline: true
            },
            {
                name: `Autoplay:`,
                value: `🎵 ${data.queue?.autoplay ? "Activo" : "Deshabilitado"}`,
                inline: true
            },
            {
                name: `Repetir`,
                value: `🔁 ${!data.queue?.repeatMode
                    ? "Deshabilitado"
                    : (data.queue?.repeatMode === 1
                        ? "Canción"
                        : "Lista")}`,
                inline: true
            }
        ])
        .setThumbnail(data.song?.thumbnail!)
        .setFooter({
            text: `Petición de ${data.song?.member?.displayName}`,
        })
}

export const PLAYER_QUEUE = async (data: PlayerQueue) => {
    let queueText: string | undefined = "No hay canciones en espera";

    if (!data.isEmpty) {
        const queueArray = data.queue?.songs.map((song, index) => {
            return `${index + 1}. ${song.name}`;
        })
    
        if (queueArray?.length === 1) {
            queueArray[0] = queueText;
        } else {
            queueArray?.shift()
        }
    
        queueText = queueArray?.join("\n");
    }

    return new EmbedBuilder()
        .setColor(Colors.LuminousVividPink)
        .setAuthor({
            name: `Lista de reproducción`,
        })
        .setDescription(queueText!);
}

export const ADDING_SONG = async (data: PlayerQueue) => {
    return new EmbedBuilder()
        .setColor(Colors.LuminousVividPink)
        .setAuthor({
            name: `${data.song?.member?.displayName} ha añadido una canción`,
            iconURL: "https://cdn-icons-png.flaticon.com/512/2995/2995101.png"
        })
        .setDescription(`${data.song?.name} en la posición: ${data.queue!.songs.length + 1}`)
}

export const PLAYER_NO_PREVIOUS = async () => {
    return new EmbedBuilder()
        .setColor(Colors.LuminousVividPink)
        .setAuthor({
            name: `Lista de reproducción`
        })
        .setDescription("No hay canciones anteriores!")
}

export const configMessageEmbed = async (config: configVariablesTypes) => {

    const lang = config.lang;

    return new EmbedBuilder()
        .setColor(Colors.LuminousVividPink)
        .setTitle("Canal de configuración")
        .setDescription(`
            Este canal esta dedicado a la configuración individual del servidor.

            El uso de este canal debe ser exclusivo del Bot y cambiar de forma manual cualquier mensaje puede afectar algunas funcionalidades de **Uraraka Ochaco Discord Bot** como las definidas en el siguiente mensaje.

            ESTE CANAL NO ES PARA USO DEL CHAT, ESCRIBIR AQUÍ O ELIMINAR MENSAJES DAÑARA LAS FUNCIONES DEL BOT.

            **Lista de los comandos actualmente disponibles para el administrador**
        `)
        .addFields([
            {
                name: "[TEXT SAMPLE]",
                value: "No ha sido configurado aun ningún comando exclusivo"
            },
            {
                name: "Configuración actual del servidor",
                value: "El siguiente mensaje tiene toda la configuración única del servidor, por favor no lo modifiques"
            }
        ])
        .setFooter({
            text: "By Uraraka Ochaco Discord Bot"
        })
        .setTimestamp();
}

export const configMessageVariables = async (config: configVariablesTypes) => {
    return JSON.stringify(config, null, 4);
}