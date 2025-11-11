# nginx/Dockerfile
FROM nginx:alpine

# Copy your vhost config
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

# Optional: healthcheck endpoint
RUN printf "health ok\n" > /usr/share/nginx/html/health.txt
