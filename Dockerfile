FROM php:7.1.29-fpm-alpine

RUN apk update && apk upgrade && apk add \
  autoconf \
  automake \
  g++ \
  mysql-client \
  libc6-compat \
  libjpeg-turbo-dev \
  libpng-dev \
  freetype-dev \
  icu-dev \
  make \
  zip \
  jpegoptim optipng pngquant gifsicle \
  nano \
  unzip \
  git \
  curl \
  shadow

COPY ./php.ini $PHP_INI_DIR/php.ini

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl intl mysqli
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ARG USER_ID
ARG GROUP_ID

WORKDIR /var/www

RUN addgroup -g 1000 app
RUN useradd -r -u 1000 -g app app

USER app

ENV PHP_EXTRA_CONFIGURE_ARGS --enable-fpm --with-fpm-user=app --with-fpm-group=app
