# yoink
A web UI for sending Wake-On-LAN (WOL) packets. An example use case for this would be to have it running on a Raspberry Pi on the same LAN as your server.

![docker build status](https://github.com/jbritain/yoink/actions/workflows/docker-hub.yml/badge.svg)
![docker pull count](https://img.shields.io/docker/pulls/jbritain/yoink)
![version](https://img.shields.io/docker/v/jbritain/yoink)

## Screenshots
![A screenshot of yoink](/screenshots/release1.5.png)

## Installation/Usage
### With Docker
The recommended method for using yoink is through Docker, with something similar to this example `docker-compose.yml`

```yml
services:
  yoink:
    image: jbritain/yoink:latest
    container_name: yoink
    network_mode: host
    restart: unless-stopped
    environment:
      - NAME=YOUR_SERVER_NAME # appears at the top of the webpage
      - MAC=00:11:22:33:44:55 # the target's MAC address
      - IP=192.168.1.123 # the target's IP address
      - PORT=8080 # port to run on
      - PASSWORD=pleasechangeme # password required to access yoink, leave blank if you do not need authentication
      - STATUS_INTERVAL=5000 # how often the frontend pings to request server status, in ms
      - ONLINE_TIMOUT=30000 # how long before it is decided the server did not respond to the WOL ping. Has no actual effect, only means the status returns to 'offline' sooner
    # - TOKEN_KEY=[YOUR_SECURE_STRING] # ONLY SET THIS IF YOU DO NOT WANT RESTARTING YOINK TO INVALIDATE SESSION TOKENS. I RECOMMEND YOU DO NOT SET THIS VALUE. IF YOU DO SET IT, DO NOT SHARE IT WITH ANYONE AS IT CAN BE USED TO REVERSE ENGINEER THE PASSWORD
```

### With Node.js
Currently, running the app directly through Node.js is not officially supported (coming soon to a package manager near you), however you can clone the repo and `npm run dev` in the `src` folder.
