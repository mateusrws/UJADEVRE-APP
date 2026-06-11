FROM node:24.1-slim

WORKDIR /usr/src/api

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*


COPY package*.json ./

COPY prisma ./prisma/

COPY .env.production .env


RUN npm install --quiet --no-fund --loglevel=error


RUN npx prisma generate

COPY . .

RUN npx nest build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
