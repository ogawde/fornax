FROM oven/bun:1

WORKDIR /app


COPY package.json ./
RUN bun install --production

COPY . .


ENV PORT=3001
EXPOSE 3001

CMD ["bun", "run", "index.ts"]

