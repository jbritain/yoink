# yoink
A web UI for sending Wake-On-LAN (WOL) packets. An example use case for this would be to have it running on a Raspberry Pi on the same LAN as your server.

![docker build status](https://github.com/jbritain/yoink/actions/workflows/docker-hub.yml/badge.svg)
![docker pull count](https://img.shields.io/docker/pulls/jbritain/yoink)
![version](https://img.shields.io/docker/v/jbritain/yoink)

## Screenshots
![A screenshot of yoink](/screenshots/alpha0.1.0.png)

## Installation/Usage
### With Docker
The recommended method for using yoink is through Docker, with something similar to this example `docker-compose.yml`

```yml
services:
  yoink:
    image: jbritain/yoink:latest
    container_name: yoink
    network-mode: host
    restart: unless-stopped
    environment:
      - NAME=YOUR_SERVER_NAME # appears at the top of the webpage
      - MAC=00:11:22:33:44:55 # the target's MAC address
      - IP=192.168.1.123 # the target's IP address
      - PORT=8080 # port to run on
```

### With Node.js
Currently, running the app directly through Node.js is not officially supported (coming soon to a package manager near you), however you can clone the repo and `npm run dev` in the `src` folder.
