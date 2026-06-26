# Use official Nginx Alpine image
FROM nginx:alpine

# Set working directory to Nginx HTML root
WORKDIR /usr/share/nginx/html

# Copy application files to container
COPY . .

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
