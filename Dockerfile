FROM node:14
WORKDIR /app
COPY packages/server/package.json ./
RUN yarn install --production --frozen-lockfile
COPY packages/server .
COPY packages/client/build web
CMD ["yarn", "start"]