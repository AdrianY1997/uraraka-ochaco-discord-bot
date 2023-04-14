import { EmbedBuilder, Colors } from 'discord.js';
import { Queue, Song } from 'distube';
import { configVariablesTypes } from './types';

export const PLAYER_INFO = async (queue?: Queue, song?: Song, isNew?: boolean) => {
    if (isNew) {
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
            name: `${song?.name?.substring(0, 25)}...`,
            url: song?.url,
            iconURL: "https://cdn-icons-png.flaticon.com/512/2995/2995101.png"
        })
        .setFields([
            {
                name: `Duración:`,
                value: `${song?.formattedDuration}`,
                inline: true
            },
            {
                name: `Total:`,
                value: `${queue?.formattedDuration}`,
                inline: true
            },
            {
                name: `Fuente:`,
                value: `${song?.source}`,
                inline: true
            },
            {
                name: `Estado`,
                value: `${queue?.paused ? "Pausado" : "Reproduciendo"}`,
                inline: true
            },
            {
                name: `Autoplay:`,
                value: `🎵 ${queue?.autoplay ? "Activo" : "Deshabilitado"}`,
                inline: true
            },
            {
                name: `Repetir`,
                value: `🔁 ${!queue?.repeatMode 
                    ? "Deshabilitado" 
                    : (queue?.repeatMode === 1 
                        ? "Canción" 
                        : "Lista")}`,
                inline: true                
            }
        ])
        .setThumbnail(song?.thumbnail!)
        .setFooter({
            text: `Petición de ${song?.member?.displayName}`,
        })
}

export const PLAYER_QUEUE = async (queue?: Queue, song?: Song, isEmpty?: boolean) => {
    if (isEmpty) {
        return new EmbedBuilder()
            .setColor(Colors.LuminousVividPink)
            .setAuthor({
                name: `Lista de reproducción`,
            })
            .setDescription("No hay canciones en espera")
    }
    return new EmbedBuilder()

}

export const configMessageEmbed = async (config: configVariablesTypes) => {

    const lang = config.lang;

    return new EmbedBuilder()
        .setColor(Colors.LuminousVividPink)
        .setTitle("Canal de configuración")
        .setDescription(`
            Este canal esta dedicado a la configuración individual del servidor.

            El uso de este canal debe ser exclusivo del Bot y cambiar de forma manual cualquier mensaje puede afectar algunas funcionalidades de **Uraraka Ochaco Discord Bot** como las definidas en el siguiente mensaje.

            ESTE CANAL NO ES PARA USO DEL CHAT, ESCRIBIR AQUI O ELIMINAR MENSAJES DAÑARA LAS FUNCIONES DEL BOT.

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