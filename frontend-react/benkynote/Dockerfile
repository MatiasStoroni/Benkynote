# Etapa de desarrollo
FROM node:20.14.0-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar solo las dependencias necesarias para el desarrollo
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto de desarrollo
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]




















#----------------------------------------------------PRODUCCION
# # Etapa 1: Construcción
# FROM node:20.14.0-alpine as build-stage

# WORKDIR /app

# # Copia el archivo package.json y el lockfile primero para aprovechar la caché de Docker
# COPY package*.json ./

# # Instala todas las dependencias
# RUN npm ci

# # Copia el resto de los archivos del proyecto
# COPY . .

# # Construye la aplicación
# RUN npm run build

# # Verifica si el directorio `.next` fue creado correctamente
# RUN ls -la .next || echo "Error: El directorio .next no fue generado"

# # Etapa 2: Producción
# FROM node:20.14.0-alpine as production-stage

# WORKDIR /app

# # Copia el resultado de la construcción desde la etapa de construcción
# COPY --from=build-stage /app /app

# # Verifica que el contenido del directorio .next fue copiado
# RUN ls -la .next || echo "Error: El directorio .next no fue copiado a la imagen de producción"

# # Exponer el puerto 3000 para acceder a Next.js
# EXPOSE 3000

# # Comando para iniciar la construcción de producción
# CMD ["npm", "run", "start"]


