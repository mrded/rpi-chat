FROM sdhibit/rpi-raspbian:jessie

MAINTAINER Dmitry Demenchuk "dmitry@demenchuk.me"

RUN apt-get update --fix-missing
RUN apt-get install -y hostapd dbus net-tools dnsmasq curl

# Install nodejs
#@TODO: Move nodejs into separate container.
RUN curl -L https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs

# Clean up.
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

ADD hostapd.conf /etc/hostapd/hostapd.conf
ADD hostapd /etc/default/hostapd
ADD dnsmasq.conf /etc/dnsmasq.conf

# Copy web-server
COPY src /src
# Build client from development env, then install minimum packages to run the server.
RUN cd /src; NODE_ENV=development npm i --unsafe-perm; rm -rf node_modules; NODE_ENV=production npm i --ignore-scripts

WORKDIR /src

ADD entrypoint.sh /entrypoint.sh

ENV PORT 80

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80
