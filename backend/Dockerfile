FROM node:18-alpine

WORKDIR /app

# Install PostgreSQL client libraries
RUN apk add --no-cache postgresql-client

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Copy backend project files
WORKDIR /app
COPY backend/ ./backend/

# Create uploads directory
RUN mkdir -p backend/uploads

EXPOSE 5000

CMD ["node", "backend/server.js"] 