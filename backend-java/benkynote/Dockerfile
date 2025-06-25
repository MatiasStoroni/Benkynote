FROM eclipse-temurin:17-jdk-focal
 
WORKDIR /app
 
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:go-offline
 
COPY src ./src
 
EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]




#----------------------------------------------------------
# Etapa de construcción: usar una imagen Maven con JDK 17
#FROM maven:3.8.6-eclipse-temurin-17 AS build
#WORKDIR /app
#COPY pom.xml .
#COPY src ./src
#RUN mvn clean package -DskipTests

# Etapa de ejecución: usar una imagen OpenJDK 17
#FROM eclipse-temurin:17-jdk-alpine
#WORKDIR /app
#COPY --from=build /app/target/benkynote-0.0.1-SNAPSHOT.jar ./app.jar
#COPY --from=build /app/src ./src
#COPY --from=build /app/pom.xml ./pom.xml

# Instalar Maven en la etapa de ejecución
#RUN apk add --no-cache maven

#EXPOSE 8080

# Comando para iniciar la aplicación con DevTools
#CMD ["mvn", "spring-boot:run"]


#------------------------------------------------------------------------------------
#Este dockerfile solo levantaba la app java siempre no se actualizaba constantemente

# Usar una imagen Maven con JDK 17 para la etapa de construcción
#FROM maven:3.8.6-eclipse-temurin-17 AS build
#WORKDIR /app
#COPY pom.xml .
#COPY src ./src
#RUN mvn clean package -DskipTests

# Usar una imagen OpenJDK 17 para la etapa de ejecución
#FROM eclipse-temurin:17-jdk-alpine
#WORKDIR /app
#COPY --from=build /app/target/benkynote-0.0.1-SNAPSHOT.jar ./app.jar
#EXPOSE 8080
#CMD ["java", "-jar", "app.jar"]