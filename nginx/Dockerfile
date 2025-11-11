# nginx/Dockerfile
FROM nginx:alpine

# Copy your vhost
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

# (Optional) basic healthcheck
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -q -O - http://127.0.0.1/ || exit 1
