FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

#RUN npm install
#RUN ng build --prod

COPY dist/admin/ /usr/share/nginx/html/.
