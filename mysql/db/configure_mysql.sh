#!/bin/bash

# Asegúrate de que los permisos del archivo my.cnf sean correctos
chmod 644 /etc/mysql/my.cnf

chown -R mysql:mysql /var/lib/mysql

chmod 750 /var/lib/mysql

mysql -u root -p${MYSQL_ROOT_PASSWORD} -e "ALTER USER 'root' IDENTIFIED WITH caching_sha2_password BY '${MYSQL_ROOT_PASSWORD}'; FLUSH PRIVILEGES;"

# Inicia el servicio de MySQL
exec "$@"