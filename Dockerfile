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
RUN cd /src; npm install

WORKDIR /src

ADD entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
