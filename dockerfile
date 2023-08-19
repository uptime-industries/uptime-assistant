FROM node:lts-hydrogen AS builder
WORKDIR /usr/bot

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# RUNNER
FROM node:lts-hydrogen AS runner

WORKDIR /usr/bot

COPY package*.json .

COPY ./locales ./locales

ARG NODE_ENV=production

RUN npm ci --omit=dev

COPY --from=builder /usr/bot/dist/ ./dist

USER node

CMD [ "node", "dist/bot.js" ]