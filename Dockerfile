FROM nginx
COPY build/item_images /tmp/item_images
COPY build usr/share/nginx/html
COPY startup.sh .
#RUN chmod 777 usr/share/nginx/html/item_images
CMD bash -C 'startup.sh'


#docker build -t gcr.io/edgify-framework/pos-ui-demo .
#docker push gcr.io/edgify-framework/pos-ui-demo