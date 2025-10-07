# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .
<<<<<<< HEAD

# Build the application
=======
# Build the application (this will create both build/ and dist/ directories)
>>>>>>> 5d5e6b8 (Deployed on Kubernetes with HPA and db with cloudNativePG)
RUN npm run build

# Production stage
FROM nginx:1.24.0-alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 