# syntax=docker/dockerfile:1

FROM node:24-alpine
WORKDIR /app
COPY . .
# RUN npm install --omit=dev
CMD ["node", "./server.js"]
EXPOSE 3000