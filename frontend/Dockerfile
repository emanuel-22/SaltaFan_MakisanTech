# Etapa de construcción
FROM node:20-alpine3.20 AS build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos necesarios para instalar las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos fuente y construye la aplicación
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine AS production

# Copia los archivos compilados al directorio predeterminado de Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copia la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 3031

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
