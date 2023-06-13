# yoink
A web UI for sending Wake-On-LAN (WOL) packets. An example use case for this would be to have it running on a Raspberry Pi on the same LAN as your server.

![docker build status](https://github.com/jbritain/yoink/actions/workflows/docker-hub.yml/badge.svg)

## Usage
### With Docker
This is the recommended method for using yoink. Here is an example `docker-compose.yml`

```yml
services:
  yoink:
    image: jbritain/yoink:latest
    container_name: yoink
    ports:
      - "8080:8080" # port 8080 is used by the app by default, you can change this, though you may as well just change the one Docker exposes
    environment:
      - NAME=YOUR_SERVER_NAME # appears at the top of the webpage
      - MAC=00:11:22:33:44:55 # the target's MAC address
      - IP=192.168.1.123 # the target's IP address
```

### With Node.js
Currently, running the app directly through Node.js is not officially supported (coming soon to a package manager near you), however you can clone the repo and `npm run dev` in the `src` folder.
