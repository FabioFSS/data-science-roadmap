# ---------- Stage 1: build do cliente (Vite) ----------
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# ---------- Stage 2: imagem final (servidor Express + estáticos) ----------
FROM node:20-alpine AS runtime
WORKDIR /app

COPY server/package.json ./server/
RUN cd server && npm install --omit=dev

COPY server/ ./server/
COPY --from=client-build /app/client/dist ./client/dist

WORKDIR /app/server
ENV NODE_ENV=production
ENV PORT=8080
ENV DATA_DIR=/app/server/data

EXPOSE 8080
VOLUME ["/app/server/data"]

CMD ["node", "src/index.js"]
