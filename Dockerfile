FROM node:20.3.0 as builder
WORKDIR /usr/src/runtimm-land-dashoard
ADD . .
RUN npm install
RUN npm run build

FROM nginx:1.25
EXPOSE 80
WORKDIR /opt/bin/
COPY --from=builder /usr/src/runtime-land-dashboard/dist /usr/share/nginx/html
COPY --from=builder /usr/src/runtime-land-dashboard/web-nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
