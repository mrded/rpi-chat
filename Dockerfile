FROM sdhibit/rpi-raspbian:jessie

MAINTAINER Dmitry Demenchuk "dmitry@demenchuk.me"

RUN apt-get update --fix-missing && apt-get install -y \
    hostapd \
    dbus \
    net-tools \
    iptables \
    dnsmasq \
    vim \
    nodejs \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

ADD hostapd.conf /etc/hostapd/hostapd.conf
ADD hostapd /etc/default/hostapd
ADD dnsmasq.conf /etc/dnsmasq.conf

ADD entrypoint.sh /entrypoint.sh

RUN mkdir -p /usr/src/rpi-chat
COPY src/server.js /usr/src/rpi-chat/server.js
WORKDIR /usr/src/rpi-chat
CMD [ "nodejs", "server.js" ]

ENTRYPOINT ["/entrypoint.sh"]
