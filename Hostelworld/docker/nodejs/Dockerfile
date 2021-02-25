FROM node:14

COPY wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

WORKDIR /usr/src/app

CMD npm install ; wait-for-it database:3306 ; node app.js

EXPOSE 8081
