FROM node:lts-alpine
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci --production --silent && mv node_modules ../
COPY ./ /usr/src/bot
RUN chown -R node /usr/src/bot
USER node
CMD ["node", "./dist/bot.js","--no-deployment"]