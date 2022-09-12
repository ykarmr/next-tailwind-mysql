FROM node:14-alpine

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN apk add make automake gcc g++ subversion python3 pkgconfig

WORKDIR /usr/src/webapp