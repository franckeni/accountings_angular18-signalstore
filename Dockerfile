FROM node:20.13.1-alpine3.19 AS build
ARG NG_CONFIGURATION=production
WORKDIR /usr/src/accountings-front/
RUN npm install -g @angular/cli
COPY . /usr/src/accountings-front/
# npm ci should be used instead of npm install because we are on
# a ci/cd env.
RUN npm ci --legacy-peer-deps --no-progress \ 
# Prerender false to avoid placeholder invalid url value bug
    && ng build --configuration=${NG_CONFIGURATION} --prerender=false --ssr=false


FROM nginx:latest
# install gettext for envsubst
RUN apt-get update \
    && apt-get install gettext-base
WORKDIR /usr/share/nginx/html
RUN rm -r /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/accountings-front/dist/foundation/browser .
COPY ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
CMD [ "nginx", "-g", "daemon off;" ]
EXPOSE 80