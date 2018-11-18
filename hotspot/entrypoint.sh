#!/bin/bash

# SIGTERM-handler
term_handler() {
  echo "Get SIGTERM"

  systemctl stop dnsmasq
  systemctl stop hostapd
  systemctl stop dbus
  kill -TERM "$child" 2> /dev/null
}

ifconfig wlan0 10.0.0.1/24

# For some reasons wpa_supplicant need to be off.
killall wpa_supplicant

systemctl start dbus
systemctl start hostapd
systemctl start dnsmasq

echo 1 > /proc/sys/net/ipv4/ip_forward

# setup handlers
trap term_handler SIGTERM
trap term_handler SIGKILL

sleep infinity &
child=$!
wait "$child"
