FROM sdhibit/rpi-raspbian:jessie

MAINTAINER Dmitry Demenchuk "dmitry@demenchuk.me"

RUN apt-get update --fix-missing && apt-get install -y \
    hostapd \
    dbus \
    net-tools \
    iptables \
    dnsmasq \
    vim \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

ADD hostapd.conf /etc/hostapd/hostapd.conf
ADD hostapd /etc/default/hostapd
ADD dnsmasq.conf /etc/dnsmasq.conf

ADD entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
