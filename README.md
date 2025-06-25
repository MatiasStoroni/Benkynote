# Benkynote

Esto esta pensado para ejecutar cada directorio con docker, igual si quieren trabajarlo local con cada directorio fijense de descargar las dependencias necesarias(java,maven,python,node,npm,etc).

En el docker compose también agregué la base de datos directamente, creo que si se desarrolla localmente lo mejor sería levantar este servicio solo.

Si lo hacen con docker, bajenle los recursos porque si no se come todo. Tienen que crear un archivo que se llama .wslconfig en la carpeta de usuario (c:/users/{nombreUsuario}/.wslconfig) a este archivo abranlo con un editor de texto y le agregan este texto tal cual (solo cambien los números dependiendo de los recursos suyos):

``[wsl2]
memory=3GB
processors=3
``
(Uno abajo del otro esto no se porque se pone asi)

Construye todos los servicios que estan en el docker-compose.yml:

``docker compose build``

Para ejecutar los contenedores (Ejecuta todos):

``docker compose up -d``

Para ejecutar un solo contenedor

``docker compose run {nombre del servicio en el archivo docker-compose.yml}``

Ej: docker compose run db (Creo)

Para bajarlos:

``docker compose down``
