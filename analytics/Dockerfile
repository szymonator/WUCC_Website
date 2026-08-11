# syntax=docker/dockerfile:1

FROM node:24
WORKDIR /app
COPY . .
RUN npm ci
CMD ["node", "./server.js"]
EXPOSE 3000