FROM node:24-slim

WORKDIR /usr/src/api

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Copy Prisma schema
COPY prisma ./prisma/

# Copy environment file (needed for prisma generate)
COPY .env.production .env

# Install dependencies
RUN npm install --quiet --no-fund --loglevel=error

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build the NestJS application
RUN npx nest build

EXPOSE 3000

CMD ["node", "dist/main.js"]
