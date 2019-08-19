FROM node:12.8.0-alpine

ENV COMPlus_EnableDiagnostics=0
WORKDIR /usr/share/mo_dev_web

EXPOSE 5002

COPY ./build /usr/share/mo_dev_web
RUN cd /usr/share/mo_dev_web
RUN yarn global add serve


CMD ["serve", "-l", "5002", "."]