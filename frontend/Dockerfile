# Dockerfile
FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app

# Build and optimize react app
RUN yarn run build

EXPOSE 3000

# defined in package.json
CMD [ "yarn", "run", "serve", "-l", "3000", "-s", "build" ]
