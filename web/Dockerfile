FROM node:10

MAINTAINER Dmitry Demenchuk "dmitry@demenchuk.me"

# Copy web-server
COPY . /src

ENV PORT 80

# Build client from development env, and clean up.
RUN cd /src; \
      NODE_ENV=development npm i; \
      REACT_APP_COUCH_HOST='http://10.0.0.1:5984' npm run build; \
      rm -rf node_modules

# Install dependencies for production.
RUN cd /src; \
      NODE_ENV=production npm i

WORKDIR /src

EXPOSE 80

CMD ["npm", "start"]
