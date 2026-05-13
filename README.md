# Authentication Service

A production-style Authentication & Authorization Microservice built using Spring Boot and Spring Security for a distributed Ecommerce ecosystem.

This service is responsible for:

- User Registration
- User Authentication
- JWT Token Generation
- Refresh Token Management
- Account Activation via Email
- Secure Session Management
- API Documentation via Swagger/OpenAPI

---

# Architecture Overview

This service is designed as an independent microservice within a larger distributed system architecture.

Typical ecosystem:

[ UI Service ]
|
v
[ API Gateway ]
|
v
[ Auth Service ] ---> PostgreSQL
|
---> Mail Server

The Auth Service acts as the centralized identity provider for all downstream services.

---

# Tech Stack

| Technology | Purpose |
|---|---|
| Java 17 | Core Programming Language |
| Spring Boot 3 | Backend Framework |
| Spring Security | Authentication & Authorization |
| Spring Data JPA | ORM Layer |
| PostgreSQL | Relational Database |
| JWT | Stateless Authentication |
| Swagger/OpenAPI | API Documentation |
| Docker Compose | Local Container Orchestration |
| Lombok | Boilerplate Reduction |
| Thymeleaf | Email Templates |
| Jakarta Mail | Email Verification |

---

# Key Features

- JWT-based Authentication
- Access + Refresh Token Flow
- Role-Based Security
- Email-based Account Activation
- Stateless Authentication Architecture
- OpenAPI/Swagger Integration
- Production-ready layered architecture
- Validation-enabled request handling
- PostgreSQL persistence layer

---

# Authentication Flow

## User Registration

1. User submits registration request
2. Account created in inactive state
3. Activation email sent
4. User clicks activation link
5. Account becomes active

---

## User Login

1. User authenticates with credentials
2. Access Token generated
3. Refresh Token generated
4. Tokens returned to client

---

## Token Refresh

1. Client submits Refresh Token
2. Service validates token
3. New Access Token generated
4. Optional Refresh Token rotation

---

# API Endpoints

## Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/authenticate` | Authenticate user |
| GET | `/auth/activate-account` | Activate account via email token |
| POST | `/auth/refresh` | Refresh JWT tokens |

---

# Sample Requests

## Register User

```http
POST /auth/register
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "password"
}

POST /auth/authenticate

{
  "email": "john@example.com",
  "password": "password"
}

POST /auth/refresh

{
  "refreshToken": "your-refresh-token"
}

# Security Architecture

This service implements:

JWT Access Tokens
Refresh Token Strategy
Password Encryption
Stateless Authentication
Secure API Access
Role-based Authorization
Email Verification

# Package Structure
src/main/java
│
├── auth
│   ├── controller
│   ├── service
│   ├── dto
│   └── security
│
├── user
│
├── token
│
├── config
│
├── exception
│
└── util

# Running the Application
Prerequisites
Java 17+
Maven
PostgreSQL
Docker (Optional)

#Local Setup

Clone Repository
git clone <repository-url>
cd auth-service

# Build Project
mvn clean install

# Run Application
mvn spring-boot:run

Docker Setup
docker-compose up --build

# Environment Variables

DB_URL=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=

MAIL_USERNAME=
MAIL_PASSWORD=

SPRING_PROFILES_ACTIVE=dev

Swagger Documentation
http://localhost:8080/swagger-ui/index.html

Open API Docs
http://localhost:8080/v3/api-docs

Database

Primary Database:

PostgreSQL

ORM:

Spring Data JPA
Hibernate

Assumed Microservice Ecosystem Integration

This service is assumed to integrate with:

API Gateway
User Service
Notification Service
UI Frontend
Service Discovery
Centralized Logging
Monitoring Stack

Production Enhancements (Future Scope)
OAuth2 Integration
Redis Token Blacklisting
API Rate Limiting
MFA / 2FA
Kubernetes Deployment
Circuit Breaker Support
Distributed Tracing
Centralized Config Server
Kafka-based Authentication Events

Testing

Run tests using:

mvn test


Design Principles
Stateless Authentication
Separation of Concerns
Layered Architecture
Microservice-first Design
Secure-by-default APIs
Extensible Security Model