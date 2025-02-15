FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080

CMD ["node", "index.js"]