# Use an official OpenJDK runtime as a base image
FROM eclipse-temurin:21-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from target folder into the container
COPY target/*.jar app.jar

# Expose the port your app runs on (default Spring Boot port)
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
