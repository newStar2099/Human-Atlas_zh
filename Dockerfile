# ---- stage 1: build the static atlas ---------------------------------------
FROM node:24-alpine AS build
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- stage 2: HTTPS auth gateway + static files -----------------------------
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY server/package.json ./server/package.json
RUN cd server && npm install --omit=dev --no-audit --no-fund
COPY server/server.mjs ./server/server.mjs
COPY server/assets ./server/assets
COPY --from=build /build/dist ./dist
VOLUME ["/data"]
EXPOSE 3443
ENV PORT=3443 DATA_DIR=/data DIST_DIR=/app/dist
HEALTHCHECK --interval=30s --timeout=5s CMD wget -q --no-check-certificate -O /dev/null https://127.0.0.1:3443/login || exit 1
CMD ["node", "server/server.mjs"]
