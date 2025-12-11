# Database Schema Documentation

This document describes the database schema for the AI Interactive Book platform.

## Users Table

Stores user account information and learning profiles.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (Primary Key) | Unique identifier for the user |
| email | VARCHAR (Unique) | User's email address |
| hashed_password | VARCHAR | BCrypt hashed password |
| software_experience | VARCHAR | User's software experience level (beginner, intermediate, advanced) |
| hardware_experience | VARCHAR | User's hardware experience level (beginner, intermediate, advanced) |
| learning_style | VARCHAR | User's preferred learning style (visual, auditory, kinesthetic, reading/writing) |
| created_at | TIMESTAMP | Timestamp when the user account was created |

## Chat Logs Table

Stores records of user interactions with the AI chatbot for analytics and improvement.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (Primary Key) | Unique identifier for the chat log entry |
| user_id | INTEGER (Foreign Key) | Reference to the user who initiated the chat |
| query | TEXT | The user's question or input |
| response | TEXT | The AI's response to the query |
| timestamp | TIMESTAMP | When the chat interaction occurred |

## Indexes

The following indexes are created to optimize query performance:

1. `users_email_idx` - On the `email` column of the `users` table for fast lookups during authentication
2. `users_id_idx` - On the `id` column of the `users` table for fast lookups by user ID
3. `chat_logs_user_id_idx` - On the `user_id` column of the `chat_logs` table for retrieving user chat history
4. `chat_logs_timestamp_idx` - On the `timestamp` column of the `chat_logs` table for time-based queries

## Relationships

- Each chat log entry is associated with exactly one user through the `user_id` foreign key
- Users can have zero or many chat log entries

## Data Constraints

1. Email addresses must be unique across all users
2. Email addresses must follow standard email format
3. Experience levels must be one of: beginner, intermediate, advanced
4. Learning styles must be one of: visual, auditory, kinesthetic, reading/writing

## Sample Queries

### Get user profile by email
```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

### Get chat history for a user
```sql
SELECT * FROM chat_logs WHERE user_id = 123 ORDER BY timestamp DESC;
```

### Get recent chat interactions
```sql
SELECT * FROM chat_logs WHERE timestamp > '2025-01-01' ORDER BY timestamp DESC LIMIT 10;
```

## Connection Details

The application connects to Neon Serverless Postgres using the connection string provided in the `DATABASE_URL` environment variable.

Example connection string format:
```
postgresql://username:password@host.region.neon.tech:5432/database_name
```

## Security Considerations

1. Passwords are never stored in plain text - only BCrypt hashes are stored
2. Database connections should use SSL encryption
3. Sensitive data should be accessed through properly authenticated API endpoints only
4. Regular backups should be performed
5. Access logs should be monitored for suspicious activity