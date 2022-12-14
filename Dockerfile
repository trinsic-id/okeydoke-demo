FROM node:16 as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.3

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
STOPSIGNAL SIGTERM
#run
CMD ["nginx", "-g", "daemon off;"]
