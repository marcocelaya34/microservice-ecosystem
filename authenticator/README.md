# Authenticator

The "Authenticator" microservice is an application written in TypeScript and developed using the NestJS framework. This project is responsible for managing authentication logic, focusing on token validation to ensure security in a specific environment.

## Key Features

1. Token Validation:
   The primary goal of Authenticator is to verify the authenticity and validity of provided tokens. It utilizes Auth0 as a strategy for token validation, which involves signature verification, expiration checking, and validation of any other criteria necessary to ensure token integrity.

2. Developed in TypeScript:
   The use of TypeScript provides a more robust development environment by adding static typing to the code, helping prevent common errors and improving code maintainability.

3. Based on NestJS:
   NestJS is used as the development framework to facilitate the creation of scalable and modularized microservices. It provides a module-based architecture and is designed to be easily scalable and maintainable.

## Installation and Usage

1. Clone the repository

2. Navigate to the project directory:

   ```
   cd authenticator
   ```

3. Install the dependencies

   ```
   npm install
   ```

4. Configure environment variables.

   Copy the `.env.example` file to `.env` and fill in your own settings:

5. Start the application
   ```
   npm run start:dev
   ```

## Authors

- **Marco Antonio Celaya Ordaz** - *Initial work* - [Marco Celaya - Linkeding](https://github.com/marcocelaya34)

