# Salta Fan - Frontend

Este es el frontend de la aplicación **Salta Fan**, desarrollada con **React** y **Vite**.

## Requisitos

- [Node.js](https://nodejs.org/) (Recomendado la versión LTS)
- [npm](https://www.npmjs.com/) (Viene incluido con Node.js)

## Instalación Local

1. Clona o haz un pull de este repositorio en tu máquina local:

    git clone <nombre del repositorio>

Si ya tienes el repositorio clonado y deseas obtener la última versión:

    git pull origin <branch>

Navega al directorio del proyecto:

    cd saltafan/frontend

Instala las dependencias necesarias:

    npm install

Desarrollo

Para iniciar la aplicación en modo desarrollo, ejecuta:

    npm run dev

## Docker:

Navega al directorio del proyecto:

    cd saltafan/frontend

Haz la imagen:

    docker build -t <nombre-imagen> .

Ejecuta la imagen en un container (cambia el puerto si es necesario):

    docker run -p 80:80 <nombre-imagen>

Ingresa a http://localhost


