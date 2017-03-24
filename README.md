# rpi-chat

## Motivation
You probably noticed that there is no internet connection in some very important places such as tube's tunnel or any lower ground floor.

Why don't we create one? Perhaps it is not a real internet - but something else. The idea is to create WiFi hotspot with a chat and get to know who is around.

## Requirements
- Raspberry Pi 3 model B
- Docker

### Build 

`docker build -t rpi-chat github.com/mrded/rpi-chat`

### Run

`docker run --privileged --net=host -d rpi-chat`

## TODOs
- [X] WiFi hotspot without encryption
- [ ] [Captive portal](https://en.wikipedia.org/wiki/Captive_portal) with custom web page
- [ ] Web chat
- [ ] Setup [ngrok](https://ngrok.com/)
