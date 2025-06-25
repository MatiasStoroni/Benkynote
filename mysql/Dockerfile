FROM mysql:8.0

# Copia el archivo my.cnf a la ubicación correcta
COPY ./db/my.cnf /etc/mysql/my.cnf

COPY ./db/configure_mysql.sh /docker-entrypoint-initdb.d/configure_mysql.sh

# Ajusta los permisos del archivo my.cnf

RUN chmod 644 /etc/mysql/my.cnf

RUN chmod +x /docker-entrypoint-initdb.d/configure_mysql.sh

# Expon el puerto 3306
EXPOSE 3306