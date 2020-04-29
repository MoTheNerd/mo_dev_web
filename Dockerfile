FROM node:12.16.3-alpine

ENV COMPlus_EnableDiagnostics=0
WORKDIR /usr/share/mo_dev_web

EXPOSE 5002
COPY . /usr/share/mo_dev_web
RUN cd /usr/share/mo_dev_web
RUN yarn
RUN yarn build
RUN cd /usr/share/mo_dev_web/build
RUN yarn global add serve

CMD ["serve", "-s", "-l", "5002", "./build"]
