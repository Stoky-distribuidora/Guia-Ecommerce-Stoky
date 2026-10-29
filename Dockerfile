# ==========================================
# Etapa 1: Build da aplicação React + Vite
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências usando cache de camadas
COPY package*.json ./
RUN npm ci

# Copia todo o código fonte e assets
COPY . .

# Compila o projeto gerando a pasta dist/
RUN npm run build

# ==========================================
# Etapa 2: Servidor web ultraleve com Nginx
# ==========================================
FROM nginx:alpine AS runner

# Substitui a configuração padrão do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados da etapa de build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

