# rpi-chat

## Motivation
You probably noticed that there is no internet connection in some very important places such as tube's tunnel or any lower ground floor.

Why don't we create one? Perhaps it is not a real internet - but something else. The idea is to create WiFi hotspot with a chat and get to know who is around.

## Requirements
- Raspberry Pi 3 model B
- Docker
- Docker Compose

### Usage

`docker-compose build`
`docker-compose up --build`
`docker-compose up`
`docker-compose down`

## TODOs
- [X] WiFi hotspot without encryption
- [X] [Captive portal](https://en.wikipedia.org/wiki/Captive_portal) with custom web page
- [X] Web chat
- [ ] Possibility to send images
- [X] Add database to save chat history
