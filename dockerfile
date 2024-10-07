FROM node:lts-iron AS builder
WORKDIR /usr/bot

COPY *.json .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:lts-iron AS runner
WORKDIR /usr/bot

COPY *.json .
COPY ./locales ./locales

RUN yarn install --frozen-lockfile --production=true

COPY --from=builder /usr/bot/dist/ ./dist
COPY ./src/*.json ./dist

USER node

CMD [ "node", "." ]
