FROM sdhibit/rpi-raspbian:jessie

MAINTAINER Dmitry Demenchuk "dmitry@demenchuk.me"

RUN apt-get update --fix-missing; \
      apt-get install -y hostapd dbus net-tools dnsmasq curl

# Install nodejs
RUN curl -L https://deb.nodesource.com/setup_6.x | bash; \
      apt-get install -y nodejs

# Copy configs
ADD hostapd.conf /etc/hostapd/hostapd.conf
ADD hostapd /etc/default/hostapd
ADD dnsmasq.conf /etc/dnsmasq.conf

# Install CouchDB and enable CORS 
RUN apt-get install -y couchdb; \
      npm install -g add-cors-to-couchdb; \
      add-cors-to-couchdb 

# Clean up.
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy web-server
COPY src /src

# Build client from development env, and clean up.
RUN cd /src; \
      NODE_ENV=development npm i; \
      npm run build; \
      rm -rf node_modules

# Install dependencies for production.
RUN cd /src; \
      NODE_ENV=production npm i

WORKDIR /src

ADD entrypoint.sh /entrypoint.sh

ENV PORT 80

ENTRYPOINT ["/entrypoint.sh"]
