# Usar la imagen base de Node.js
FROM node:20.0.0

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto
EXPOSE ${APP_PORT}

# Comando para iniciar la aplicación
CMD ["npm", "run", "serve"]
