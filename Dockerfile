# SAPHIR - Dockerfile for Coolify
FROM node:20-alpine

# Install required packages
RUN apk add --no-cache git libc6-compat sqlite
RUN npm install -g bun

WORKDIR /app

# Clone the repository
RUN git clone https://github.com/topmuch/SAPHIR.git .

# Install dependencies
RUN bun install

# Generate Prisma Client
RUN npx prisma generate

# Build the application (variables inline, pas de directive ENV)
RUN NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=file:/app/data/saphir.db bun run build

# Create data directory
RUN mkdir -p /app/data

EXPOSE 3000

# Start command - init database and start server
# Variables definies en ligne (surchargeables via l'onglet Environment de Coolify)
CMD sh -c "mkdir -p /app/data && export HOSTNAME=0.0.0.0 PORT=${PORT:-3000} DATABASE_URL=${DATABASE_URL:-file:/app/data/saphir.db} && npx prisma db push --skip-generate 2>/dev/null || true && exec node .next/standalone/server.js"
