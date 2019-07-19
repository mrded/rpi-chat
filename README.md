# rpi-chat

![IMG_2804](https://user-images.githubusercontent.com/347098/60011424-ac6ff500-9671-11e9-9a2e-8c5273a1d860.PNG)

## Motivation
You probably noticed that there is no internet connection in some very important places such as tube's tunnel or any lower ground floor.

Why don't we create one? Perhaps it is not a real internet - but something else. The idea is to create WiFi hotspot with a chat and get to know who is around.

## Requirements
- Raspberry Pi with WiFi
- Docker v17
- Docker Compose

`armv6` versions of Raspberry Pi don't work with Docker v18, use v17 instead.

### Usage

- `docker-compose build`
- `docker-compose up --build`
- `docker-compose up`
- `docker-compose down`

### Running without a Docker

You can just follow instalation process from 'Dockerfile', and add systemd autoload `/etc/systemd/system/rpi-chat.service`:

```
[Unit]
Description=rpi-chat
After=network.target

[Service]
Environment=PORT=80
ExecStart=sh /home/pi/rpi-chat/hotspot/entrypoint.sh
Type=simple
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

### Troubleshooting

If you having following errors:

> fatal: unable to access 'https://github.com/xxx/xxx.git/': Failed to connect to github.com port 443: Connection refused

The problem is probably because of `dnsmasq` running. Disable it first and run again after you finished

- `sudo systemctl stop dnsmasq`.
- `sudo systemctl start dnsmasq`.

## TODOs
- [X] WiFi hotspot without encryption
- [X] [Captive portal](https://en.wikipedia.org/wiki/Captive_portal) with custom web page
- [X] Web chat
- [ ] Possibility to send images
- [X] Add database to save chat history
