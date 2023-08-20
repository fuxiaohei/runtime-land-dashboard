FROM node:20.3.0 as builder
WORKDIR /usr/src/dashboard

ARG DASH_API_URL
ENV API_URL=$DASH_API_URL

ARG DASH_CLERK_KEY
ENV CLERK_KEY=$DASH_CLERK_KEY

ADD . .

RUN npm install
RUN npm run build

FROM nginx:1.25
EXPOSE 80
WORKDIR /opt/bin/
COPY --from=builder /usr/src/dashboard/dist /usr/share/nginx/html
COPY --from=builder /usr/src/dashboard/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
