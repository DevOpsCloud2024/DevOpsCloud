FROM composer:2
WORKDIR /var/www/html

COPY src .
RUN composer install --no-dev --optimize-autoloader

FROM node:alpine
COPY --from=0 /var/www/html /var/www/html/
WORKDIR /var/www/html
RUN npm ci
RUN npm run build

FROM php:8.2-fpm-alpine

# Set working directory
WORKDIR /var/www/html

RUN apk update && apk add --no-cache oniguruma-dev libzip-dev \
    # Install MySQL extensions
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl \
    # Install PHP-Redis
    && apk add --no-cache pcre-dev $PHPIZE_DEPS \
        && pecl install redis \
        && docker-php-ext-enable redis.so

# Copy the previous stage
COPY --chown=www-data:www-data --from=1 /var/www/html /var/www/html/

# Copy the startup script
COPY php/start.sh /usr/local/bin/start
RUN chmod u+x /usr/local/bin/start

# Add Docker custom crontab script
ADD php/laravel_scheduler /etc/cron.d/laravel_scheduler

# Specify crontab file for running
RUN crontab /etc/cron.d/laravel_scheduler

# Expose the webroot directory to NGINX container
VOLUME ["/var/www/html/public"]

# Expose port 9000 of the php-fpm server
EXPOSE 9000
CMD ["/usr/local/bin/start"]