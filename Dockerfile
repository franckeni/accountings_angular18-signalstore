FROM node:20.13.1-alpine3.19 as build
ARG NG_CONFIGURATION=production
WORKDIR /usr/src/front-ssr/
RUN npm install -g @angular/cli
COPY . /usr/src/front-ssr/
# npm ci should be used instead of npm install because we are on
# a ci/cd env.
RUN npm ci --legacy-peer-deps --no-progress
# Prerender false to avoid placeholder invalid url value bug
RUN ng build --configuration=${NG_CONFIGURATION} --prerender=false


FROM node:20.13.1-alpine3.19
# install gettext for envsubst
RUN apk update
RUN apk add gettext
WORKDIR /usr/src/front-ssr/
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /usr/src/front-ssr/dist/front-ssr/server /usr/share/nginx/html
COPY --from=build /usr/src/front-ssr/dist/front-ssr/ ./
COPY ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
#CMD [ "nginx", "-g", "daemon off;" ]
EXPOSE 80