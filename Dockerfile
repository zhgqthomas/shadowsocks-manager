FROM registry.cn-hangzhou.aliyuncs.com/aliyun-node/alinode:4.7.2-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm i

EXPOSE 8080

CMD npm run docker
