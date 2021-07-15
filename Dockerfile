FROM node:14
WORKDIR /app
COPY packages/server/package.json ./
RUN yarn install --production --frozen-lockfile
RUN mkdir web src
ADD packages/server/src src
ADD packages/client/build web
CMD ["yarn", "start"]