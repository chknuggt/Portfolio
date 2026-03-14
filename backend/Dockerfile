FROM php:8.3-fpm-bookworm

ARG UID=1000
ARG GID=1000

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl unzip \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev \
    libzip-dev libicu-dev \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql bcmath gd intl zip opcache pcntl exif

# Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js 20 LTS
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g ${GID} www \
    && useradd -u ${UID} -g www -m -s /bin/bash www

# OPcache config for development
RUN echo "opcache.enable=1\nopcache.revalidate_freq=0\nopcache.validate_timestamps=1\nopcache.max_accelerated_files=10000\nopcache.memory_consumption=192" \
    > /usr/local/etc/php/conf.d/opcache.ini

# Run PHP-FPM as www user
RUN sed -i 's/^user = www-data/user = www/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/^group = www-data/group = www/' /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www/html

USER www

EXPOSE 9000
CMD ["php-fpm"]
