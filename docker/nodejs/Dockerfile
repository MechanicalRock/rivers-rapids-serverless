FROM node:8.10

RUN sysctl -w fs.inotify.max_user_watches=524288 

USER node

WORKDIR /app

ENTRYPOINT ["npm"]