# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM node:20.3.0-alpine AS node-generic
FROM --platform="linux/arm/v6" arm32v6/node:gallium-alpine AS node-arm32v6
FROM node-generic AS node-linux-amd64
FROM node-arm32v6 AS node-linux-armv6
FROM node-generic AS node-linux-armv7
FROM node-generic AS node-linux-arm64
FROM node-generic AS node-linux-ppc64le
FROM node-generic AS node-linux-s390x
FROM node-linux-${TARGETARCH}${TARGETVARIANT} AS node-linux
FROM node-${TARGETOS}

ENV NODE_ENV=production

WORKDIR /app
COPY src ./
RUN npm install --production
CMD ["node", "index.js"]
