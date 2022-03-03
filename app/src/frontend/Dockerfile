FROM node:16.13.2-alpine

COPY package.json yarn.lock ./

RUN yarn install

# Start application
CMD ["yarn", "serve"]