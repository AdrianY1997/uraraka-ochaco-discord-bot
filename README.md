# Uraraka Ochaco Discord Bot

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![TypeScript](https://img.shields.io/badge/TS-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Distube](https://img.shields.io/badge/distube-FF0000.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://distube.js.org/#/docs/DisTube/stable/general/welcome)
[![Visual Studio Code](https://img.shields.io/badge/VSC-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AdrianY1997)

Este documento se encuentra actualmente en construcción.

## ¿Que es?

Este proyecto fue creado para la practica de mis conocimientos en el lenguaje de programación TypeScript al igual que hacer uso del mismo en mis servidores de discord

### Características

- Configuración por servidor `parcial`
  > Debido a cuestiones económicas tome la decision de no utilizar un servicio de base de datos para guardar la configuración de cada servidor. por tanto se hace uso de un canal que solo los administradores podrán ver.

- Reproducción de música con el modulo [Distube](https://distube.js.org/#/docs/DisTube/stable/general/welcome)
  > Utilizar este modulo permite hacer búsquedas mediante el comando `/play <SONG | URL>` remplazando por el nombre de la canción, url de YouTube, Spotify o SoundCloud

- Asignación de canal especifico para el reproductor
  > Utilizando el comando `/admin set <target> <nombre>` es posible asignar un canal especifico para el reproductor. De esta manera es posible evitar la desorganización de los mensajes y siempre tener en un mismo sitio la información

### TODO

- [x] Reproductor de música funcional
- [x] Asignación de un canal para el reproductor
- [ ] Proyecto multi lenguaje
- [ ] Asignación de roles automáticos
- [ ] Mensajes de bienvenida personalizados
- [ ] ...

### ¿Te gustaría usar este bot de discord?

Para usar el proyecto solamente debes clonar o descargar el repositorio

```
$ git clone https://github.com/AdrianY1997/uraraka-ochaco-discord-bot.git

$ cd uraraka-ochaco-discord-bot

$ npm install
```

Crear la aplicación en [Discord Developer Portal](https://discord.com/developers/applications) y obtén tu token de aplicación

Crea un archivo `.env` y crea una propiedad `BOT_TOKEN=<TOKEN>` donde remplazaras `TOKEN` por tu Token de aplicación

y corre la aplicación con: `$ npm run dev`

Cuando invites tu Bot al servidor dale administrador y listo

### License

Todo el codigo fuente escrito en este repositorio ha sido liberado bajo los terminos de la licencia [MIT](https://github.com/AdrianY1997/uraraka-ochaco-discord-bot/blob/Alpha.0.1/LICENSE)