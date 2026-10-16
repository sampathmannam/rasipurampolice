FROM node:20-alpine
WORKDIR /app
COPY package.json server.mjs index.html admin.html public-qr.svg public-qr.png ./
EXPOSE 8080
CMD ["node", "server.mjs"]
