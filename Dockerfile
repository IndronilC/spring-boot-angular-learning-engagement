FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /auth-service

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jre

WORKDIR /auth-service

COPY --from=build /auth-service/target/*.jar auth-service.jar

ENV SPRING_PROFILES_ACTIVE=docker

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "auth-service.jar"]