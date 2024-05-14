FROM node:lts-iron AS builder
WORKDIR /usr/bot

COPY *.json .

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-iron AS runner
WORKDIR /usr/bot

COPY *.json .
COPY ./locales ./locales

RUN npm ci --omit=dev

COPY --from=builder /usr/bot/dist/ ./dist
COPY ./src/*.json ./dist

USER node

CMD [ "node", "." ]
