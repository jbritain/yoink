# syntax=docker/dockerfile:1

FROM node:20.3.0
ENV NODE_ENV=production

WORKDIR /app
COPY src ./
RUN npm install --production
CMD ["node", "index.js"]