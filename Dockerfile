FROM node:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

#RUN npm run test --browsers ChromeHeadlessNoSandbox --watch=false

ARG configuration=prod

RUN npm run build #--output-path=./dist/out --configuration $configuration


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
#FROM nginx:1.15.12-alpine

COPY --from=build-stage /app/dist/admin/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf


