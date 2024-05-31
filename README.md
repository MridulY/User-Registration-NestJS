# User Registration Service

This project is a NestJS-based microservice designed for user registration, integrating RabbitMQ for message handling and Redis for caching user data.

## Technologies

- **NestJS**
- **RabbitMQ**
- **Redis**
- **PostgreSQL**
- **TypeORM**

## Getting Started

### Prerequisites

Ensure you have Node.js, Docker, and PostgreSQL installed on your machine.

### Installation

1. Clone the repository:
2. Install dependencies:
3. Start your RabbitMQ and Redis servers using Docker:
4. Run the application:


## API Endpoints

### Register a Single User

- **URL**: `/user/register`
- **Method**: `POST`
- **Payload**:
```json
{
 "name": "John Doe",
 "email": "john.doe@example.com",
 "password": "password123"
}
```
### Response
```json
{
  "message": "User registration message sent to RabbitMQ"
}
```

### Register Multiple Users (Batch Registration)

- **URL**: `/user/batch-register`
- **Method**: `POST`
- **Payload**: 
```json
{
  "users": [
    {
      "name": "Alice",
      "email": "alice@example.com",
      "password": "password123"
    },
    {
      "name": "Bob",
      "email": "bob@example.com",
      "password": "password456"
    }
  ]
}
```

### Response
```json
{
  "message": "Batch registration successful"
}
```

### Retrieve User by ID

- **URL**: `/user/:id`
- **Method**: `GET`
- **Response**: 
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "hashed_password"
}
```

## Caching Strategy

#### User data is cached in Redis upon retrieval. If the data is not found in the cache, it is fetched from the PostgreSQL database and then stored in the cache for subsequent requests.

