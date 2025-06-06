FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli

RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist/quiniela-coto ./
CMD ["ng", "serve", "--host", "0.0.0.0"]
