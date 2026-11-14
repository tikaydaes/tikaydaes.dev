FROM node:22-alpine AS build
WORKDIR /site
COPY build.mjs products.mjs churr.mjs ./
COPY src ./src
RUN node build.mjs

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /site/dist /srv
EXPOSE 8080
