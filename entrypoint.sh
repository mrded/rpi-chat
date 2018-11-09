#!/bin/bash

# SIGTERM-handler
term_handler() {
  echo "Get SIGTERM"

  /etc/init.d/dnsmasq stop
  /etc/init.d/hostapd stop
  /etc/init.d/dbus stop
  /etc/init.d/couchdb stop
  kill -TERM "$child" 2> /dev/null
}

ifconfig wlan0 10.0.0.1/24

/etc/init.d/dbus start
/etc/init.d/hostapd start
/etc/init.d/dnsmasq start
/etc/init.d/couchdb start

npm start&

echo 1 > /proc/sys/net/ipv4/ip_forward

# setup handlers
trap term_handler SIGTERM
trap term_handler SIGKILL

sleep infinity &
child=$!
wait "$child"
