FROM node:14.4.0-slim as builder
RUN apt update && apt install git -y
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@3.4.1 -g --silent
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx
COPY --from=builder /app/build/item_images /tmp/item_images
COPY --from=builder /app/build usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# COPY build/item_images /tmp/item_images
# COPY build usr/share/nginx/html
COPY startup.sh .
#RUN chmod 777 usr/share/nginx/html/item_images
CMD bash -C 'startup.sh'


#docker build -t gcr.io/edgify-framework/pos-ui-demo .
#docker push gcr.io/edgify-framework/pos-ui-demo