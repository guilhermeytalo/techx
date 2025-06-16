# Use Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package and prisma schema first to leverage Docker cache
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy full app source
COPY . .

# Build the application
RUN npm run build

# Copy entrypoint and wait-for scripts
COPY entrypoint.sh .
COPY wait-for.sh .

# Ensure both are executable
RUN chmod +x entrypoint.sh wait-for.sh

# Expose the app port
EXPOSE 3000

# Start app through entrypoint
ENTRYPOINT ["./entrypoint.sh"]
