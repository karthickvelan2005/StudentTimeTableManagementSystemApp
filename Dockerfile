FROM openjdk:17-jdk-slim

WORKDIR /app

COPY springapp/ /app/

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/*.jar"]