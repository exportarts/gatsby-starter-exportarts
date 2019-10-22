FROM node:10-alpine
ARG SITE_PATH

# Deployment Config gets passed by Jenkins
ARG DEPLOY_USER
ARG DEPLOY_PASS
ARG PRISMIC_API_KEY
ARG HOSTING_DOMAIN
ARG TARGET_DIR

# We need label to be able to delete images afterwards
ARG IMAGE_LABEL
LABEL image=$IMAGE_LABEL

WORKDIR /build
COPY . .

# 1. Install packages
RUN apk update
RUN apk add php7 php7-phar php7-json php7-iconv php7-mbstring php7-openssl php7-ctype curl git

# 2. Install trusted certificates for PHP
RUN curl https://curl.haxx.se/ca/cacert.pem -o ca-bundle.crt && \
    cp ca-bundle.crt /usr/local/share/ca-certificates && \
    update-ca-certificates

# 3. Install dependencies
RUN yarn install --frozen-lockfile --non-interactive

# 4. Build
RUN export PRISMIC_API_KEY=${PRISMIC_API_KEY} && \
    yarn build --no-color

# 5. Deploy
RUN apk add sshpass openssh
RUN sshpass -p $DEPLOY_PASS ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$HOSTING_DOMAIN "rm -rf $TARGET_DIR/$SITE_PATH/*" && \
    sshpass -p $DEPLOY_PASS ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$HOSTING_DOMAIN "mkdir -p $TARGET_DIR/$SITE_PATH" && \
    sshpass -p $DEPLOY_PASS scp -o StrictHostKeyChecking=no -r ./public/* $DEPLOY_USER@$HOSTING_DOMAIN:$TARGET_DIR/$SITE_PATH
