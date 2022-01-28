FROM php:8.1.1-fpm-alpine

# Install extensions
RUN docker-php-ext-install pdo_mysql bcmath opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Configure PHP
COPY .docker/php.ini $PHP_INI_DIR/conf.d/opcache.ini

# Use the default development configuration
RUN mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini

# Install Bash
RUN apk --no-cache add bash

RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install xdebug-3.1.2 \
    && docker-php-ext-enable xdebug
