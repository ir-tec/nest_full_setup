# Forge

> A production-oriented REST API built with NestJS, TypeScript, PostgreSQL, and Prisma — designed around modular architecture, strong API contracts, security, automated testing, and maintainability.

Forge is a backend engineering project built to demonstrate how a modern Node.js/NestJS application can be designed, structured, tested, and prepared for production.

The project intentionally focuses on **engineering quality over feature count**. Rather than building a large collection of unrelated features, Forge uses a focused domain to demonstrate practical backend architecture and the capabilities of the NestJS ecosystem.

---

## Table of Contents

* [Overview](#overview)
* [Engineering Goals](#engineering-goals)
* [Core Features](#core-features)
* [Architecture](#architecture)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Authentication & Security](#authentication--security)
* [Validation & Error Handling](#validation--error-handling)
* [Database](#database)
* [Testing Strategy](#testing-strategy)
* [API Design](#api-design)
* [Configuration](#configuration)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Available Scripts](#available-scripts)
* [Development Workflow](#development-workflow)
* [Production Considerations](#production-considerations)
* [Roadmap](#roadmap)
* [Engineering Principles](#engineering-principles)
* [License](#license)

---

# Overview

Forge is a REST API for managing users, projects, and issues.

The domain is intentionally small:

```text
User
 │
 └── Project
       │
       └── Issue
```

This provides enough domain complexity to demonstrate:

* Authentication
* Authorization
* REST API design
* DTO-based validation
* Dependency injection
* Modular architecture
* Database persistence
* Transactions
* Exception handling
* Automated testing
* API documentation
* Configuration management
* Security practices
* Production-oriented infrastructure

The goal is not to build the largest possible application.

The goal is to demonstrate the ability to **design and maintain a well-structured backend system**.

---

# Engineering Goals

Forge is built around several engineering principles:

### Separation of concerns

Each layer has a clearly defined responsibility.

```text
HTTP
 │
 ▼
Controller
 │
 ▼
Service
 │
 ▼
Persistence
 │
 ▼
PostgreSQL
```

Infrastructure concerns such as authentication, configuration, validation, logging, and error handling are implemented independently from business logic where appropriate.

### Explicit contracts

Requests and responses should have predictable structures.

DTOs define input contracts, validation protects those contracts, and standardized errors make failures predictable for API consumers.

### Dependency injection

Application dependencies are managed through NestJS's dependency injection container rather than being instantiated throughout the application.

### Fail fast

Invalid configuration should prevent the application from starting rather than causing unexpected failures later during runtime.

### Test behavior, not implementation

Tests focus primarily on observable behavior and meaningful contracts rather than coupling the test suite to implementation details.

### Security by default

Authentication, authorization, input validation, secret management, and safe error responses are treated as application requirements rather than optional additions.

---

# Core Features

## Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Public routes
* Current authenticated user decorator
* Authentication strategy using Passport
* Password hashing
* Authentication failure handling

## Users

* User persistence
* Authenticated user endpoint
* User data isolation
* Safe response serialization

## Projects

* Project creation
* Project retrieval
* Project updates
* Project deletion
* Ownership/authorization rules
* Pagination

## Issues

* Issue creation
* Issue retrieval
* Issue updates
* Issue deletion
* Project/issue relationships
* Authorization

## API Infrastructure

* Global validation
* DTO-based request contracts
* Custom decorators
* Global authentication guard
* Global exception handling
* Consistent API error responses
* Environment-based configuration
* Database health management
* API documentation

## Testing

The application uses multiple levels of automated testing:

* Unit tests
* Integration tests
* End-to-end tests

The testing strategy is designed around the boundaries of the application rather than simply maximizing code coverage.

---

# Architecture

Forge follows a modular architecture based on NestJS's dependency injection and module system.

At a high level:

```text
                         ┌─────────────────────┐
                         │       Client        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      HTTP API       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                    ┌──────────────────────────────┐
                    │     Global Infrastructure    │
                    │                              │
                    │  Middleware                  │
                    │  Authentication Guard        │
                    │  Validation Pipe             │
                    │  Exception Filter            │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │        Feature Modules       │
                    │                              │
                    │  Auth                        │
                    │  Users                       │
                    │  Projects                    │
                    │  Issues                      │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │        Application Layer     │
                    │                              │
                    │ Controllers                  │
                    │ Services                     │
                    │ Business Rules               │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │       Persistence Layer      │
                    │                              │
                    │ Prisma                       │
                    │ PostgreSQL                   │
                    └──────────────────────────────┘
```

---

# Technology Stack

| Technology            | Purpose                              |
| --------------------- | ------------------------------------ |
| **TypeScript**        | Application language                 |
| **NestJS**            | Backend framework                    |
| **Node.js**           | Runtime                              |
| **PostgreSQL**        | Relational database                  |
| **Prisma**            | ORM / database access                |
| **Passport**          | Authentication integration           |
| **JWT**               | Stateless authentication             |
| **class-validator**   | DTO validation                       |
| **class-transformer** | DTO transformation                   |
| **Jest**              | Testing                              |
| **Supertest**         | HTTP/E2E testing                     |
| **Swagger / OpenAPI** | API documentation                    |
| **Docker**            | Containerized development/deployment |
| **GitHub Actions**    | CI/CD                                |
| **npm**               | Package management                   |

---

# Project Structure

The project follows feature-oriented organization rather than putting every controller, service, and DTO into global folders.

```text
src/
│
├── common/
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   └── public.decorator.ts
│   │
│   ├── exceptions/
│   │   ├── app.exception.ts
│   │   └── error-codes.ts
│   │
│   ├── filters/
│   │   └── http-exception.filter.ts
│   │
│   └── validation/
│       └── validation-error-messages.ts
│
├── database/
│   ├── database.module.ts
│   └── prisma.service.ts
│
├── modules/
│   │
│   ├── auth/
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   ├── types/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   │
│   ├── users/
│   │   ├── dto/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   │
│   ├── projects/
│   │   ├── dto/
│   │   ├── projects.controller.ts
│   │   ├── projects.module.ts
│   │   └── projects.service.ts
│   │
│   └── issues/
│       ├── dto/
│       ├── issues.controller.ts
│       ├── issues.module.ts
│       └── issues.service.ts
│
├── app.module.ts
└── main.ts
```

The exact structure will evolve as the application develops.

The architectural goal is to keep **feature-specific code close together** while placing genuinely cross-cutting infrastructure in `common`.

---

# Authentication & Security

Authentication is implemented using JWT and Passport.

The authentication flow is conceptually:

```text
POST /auth/login
       │
       ▼
Validate credentials
       │
       ▼
Generate JWT
       │
       ▼
Return access token
```

A protected request follows:

```text
HTTP Request
     │
     ▼
Authorization: Bearer <token>
     │
     ▼
JwtAuthGuard
     │
     ▼
Passport
     │
     ▼
JwtStrategy
     │
     ▼
Validate token
     │
     ▼
request.user
     │
     ▼
Controller
```

The application also uses a custom `@CurrentUser()` decorator to provide the authenticated user to controllers without repeatedly accessing the raw request object.

Sensitive configuration such as JWT secrets and database credentials is supplied through environment variables and is never committed to the repository.

---

# Validation & Error Handling

Forge uses DTOs as explicit API input contracts.

Example:

```ts
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

Global validation protects the application boundary before requests reach business logic.

The application uses:

* `whitelist`
* `forbidNonWhitelisted`
* `transform`
* custom validation error handling

This prevents unexpected properties from silently entering the application layer.

---

## Error Contract

API errors use a consistent structure.

Example:

```json
{
  "statusCode": 404,
  "code": "USER_NOT_FOUND",
  "message": "User not found",
  "path": "/api/v1/users/123",
  "timestamp": "2026-09-18T12:30:00.000Z"
}
```

Validation errors may additionally contain:

```json
{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Request validation failed",
  "details": [
    "email must be an email"
  ],
  "path": "/api/v1/auth/register",
  "timestamp": "2026-09-18T12:30:00.000Z"
}
```

The purpose of this contract is to make errors predictable for API consumers while preventing internal implementation details from leaking through HTTP responses.

---

# Database

Forge uses PostgreSQL for persistence and Prisma as its database access layer.

The relationship is:

```text
Application
     │
     ▼
Prisma Client
     │
     ▼
Prisma PostgreSQL Adapter
     │
     ▼
PostgreSQL
```

Database responsibilities are isolated from feature modules through the database layer.

The project also considers database-level guarantees important.

For example, application code may check whether an email already exists, but the database should still enforce the corresponding uniqueness constraint.

This protects data integrity even when multiple requests execute concurrently.

---

# Testing Strategy

Testing is treated as an engineering discipline rather than a final step.

Forge uses multiple testing boundaries.

## Unit Tests

Unit tests isolate application logic from infrastructure.

Example:

```text
UsersService
     │
     ▼
Mocked Prisma dependency
```

These tests are fast and deterministic.

Typical cases include:

* existing user
* missing user
* invalid business operation
* authorization rules
* service-level error handling

---

## Integration Tests

Integration tests verify that application components work correctly together.

For example:

```text
Prisma
   │
   ▼
PostgreSQL
```

These tests are useful for verifying:

* database queries
* relations
* constraints
* transactions
* persistence behavior

---

## End-to-End Tests

E2E tests interact with the application through HTTP.

Example:

```text
HTTP Client
    │
    ▼
NestJS Application
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Database
```

Important API behaviors are tested from the perspective of an external consumer.

Examples include:

```text
Register
Login
Authentication
Validation
Protected routes
Authorization
Project operations
Issue operations
```

---

## Why multiple levels?

The objective isn't to maximize the number of tests.

The objective is to put tests at the boundary where they provide the most confidence.

```text
                 E2E
                  ▲
                 / \
                /   \
               /     \
      Integration    \
             ▲         \
            /           \
           /             \
        Unit ─────────────
```

Unit tests provide fast feedback.

Integration tests verify infrastructure boundaries.

E2E tests verify the system's externally observable behavior.

---

# API Design

Forge follows REST-oriented API conventions.

Example endpoints:

```text
Authentication

POST   /api/v1/auth/register
POST   /api/v1/auth/login

Users

GET    /api/v1/users/me

Projects

POST   /api/v1/projects
GET    /api/v1/projects
GET    /api/v1/projects/:id
PATCH  /api/v1/projects/:id
DELETE /api/v1/projects/:id

Issues

POST   /api/v1/projects/:id/issues
GET    /api/v1/projects/:id/issues
PATCH  /api/v1/issues/:id
DELETE /api/v1/issues/:id
```

The API surface will evolve during development.

OpenAPI/Swagger documentation will provide an interactive description of the available endpoints once the API documentation layer is complete.

---

# Configuration

Application configuration is provided through environment variables.

NestJS `ConfigModule` provides centralized access to configuration.

Required configuration is validated during application startup.

Example:

```env
DATABASE_URL=
JWT_SECRET=
```

The real `.env` file is excluded from version control.

A sanitized `.env.example` is provided so developers know which variables are required.

---

# Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* PostgreSQL
* Git

Docker can also be used for local PostgreSQL development.

---

## Clone the repository

```bash
git clone <repository-url>
cd nest_forge
```

---

## Install dependencies

```bash
npm install
```

---

## Configure environment variables

Create a local `.env` file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then configure the required values.

Example:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/forge"
JWT_SECRET="your-development-secret"
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run database migrations

```bash
npx prisma migrate dev
```

---

## Start development server

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

---

# Available Scripts

Common development commands:

```bash
npm run start
```

Start the application.

```bash
npm run start:dev
```

Start the application in watch mode.

```bash
npm run build
```

Compile the application.

```bash
npm run lint
```

Run ESLint.

```bash
npm run test
```

Run unit tests.

```bash
npm run test:watch
```

Run tests in watch mode.

```bash
npm run test:cov
```

Run tests with coverage.

```bash
npm run test:e2e
```

Run end-to-end tests.

Database commands:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

---

# Development Workflow

Forge follows a development workflow intended to resemble a professional backend project.

A typical change follows:

```text
Requirement
    ↓
Design
    ↓
DTO / API contract
    ↓
Implementation
    ↓
Unit tests
    ↓
Integration tests
    ↓
E2E tests
    ↓
Lint
    ↓
Build
    ↓
Pull request / CI
```

The goal is to keep changes:

* Small
* Understandable
* Testable
* Reviewable
* Backward-compatible where appropriate

---

# Production Considerations

The project is designed with production concerns in mind.

Areas covered or planned include:

### Application

* Modular architecture
* Dependency injection
* Configuration validation
* Consistent errors
* Request validation
* Structured logging
* Health checks

### Security

* Password hashing
* JWT authentication
* Authorization
* Input validation
* Secret management
* Safe error responses
* Rate limiting
* Security headers

### Reliability

* Database constraints
* Transactions where appropriate
* Health checks
* Graceful shutdown
* Automated tests

### Operations

* Docker
* CI/CD
* Environment-specific configuration
* Database migrations
* API documentation

Not every capability is implemented at the same stage of development. The repository's roadmap tracks planned production-hardening work.

---

# Roadmap

## Foundation

* [x] NestJS project setup
* [x] Modular architecture
* [x] PostgreSQL integration
* [x] Prisma integration
* [x] Environment configuration
* [x] DTO validation
* [x] Global exception handling
* [x] JWT authentication foundation

## Authentication

* [x] Registration
* [x] Login
* [x] JWT strategy
* [x] Authentication guard
* [x] Current user decorator
* [ ] Refresh token strategy
* [ ] Authentication security hardening

## Domain

* [ ] Project management
* [ ] Project authorization
* [ ] Issue management
* [ ] Pagination
* [ ] Filtering
* [ ] Sorting

## Testing

* [ ] Service unit tests
* [ ] Authentication unit tests
* [ ] Integration tests
* [ ] Database tests
* [ ] E2E authentication tests
* [ ] E2E project tests
* [ ] E2E issue tests
* [ ] Coverage reporting

## Production

* [ ] Structured logging
* [ ] Health checks
* [ ] Rate limiting
* [ ] Security hardening
* [ ] Docker
* [ ] CI pipeline
* [ ] Deployment configuration
* [ ] Production documentation

---

# Engineering Principles

Forge follows a few principles throughout its implementation.

### Keep controllers thin

Controllers translate HTTP requests into application operations.

Business rules belong in the application/service layer.

### Keep modules cohesive

Feature-specific functionality belongs inside its feature module.

Shared infrastructure belongs in appropriate cross-cutting modules.

### Prefer explicit contracts

DTOs, response types, error codes, and API documentation make system behavior easier to understand and maintain.

### Fail fast

Invalid configuration and invalid requests should be detected as early as possible.

### Protect data at multiple layers

Application-level validation is useful, but important invariants should also be enforced by the database.

### Avoid unnecessary abstraction

Abstractions should solve real problems rather than exist simply because they are considered "enterprise."

### Optimize for maintainability

Code should be understandable by another engineer who did not originally write it.

---

# Project Status

Forge is an actively developed engineering project.

The repository is intentionally being developed incrementally, with architecture, testing, security, and production concerns introduced alongside application functionality.

The final objective is a compact but realistic NestJS backend that demonstrates the ability to:

```text
Design
  ↓
Implement
  ↓
Test
  ↓
Document
  ↓
Secure
  ↓
Deploy
  ↓
Maintain
```

rather than simply demonstrate framework syntax.

---

# License

This project is licensed under the MIT License.
