# Use Maven to build the application
FROM maven:3.9.9-eclipse-temurin-21 AS build

# Set the working directory for the build
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .

# Descargar dependencias (esto se cachea si pom.xml no cambia)
RUN mvn dependency:go-offline

# Copia el código fuente
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a minimal Java runtime for the final image (developer)
FROM openjdk:21-jdk-slim

ENV SPRING_PROFILES_ACTIVE=dev
ENV JAVA_OPTS="-Xmx256m -Xms128m"

# Application's jar file
ARG JAR_FILE=target/saltaFan-0.0.1-SNAPSHOT.jar

# Copy the jar file from the build stage to the final image
COPY --from=build /app/${JAR_FILE} app.jar

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app.jar"]