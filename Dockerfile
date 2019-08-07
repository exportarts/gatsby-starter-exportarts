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

# 3. Install dependencies
RUN yarn install --frozen-lockfile --non-interactive

# 4. Build
RUN export PRISMIC_API_KEY=${PRISMIC_API_KEY} && yarn build --noColor

# 5. Deploy
RUN apk add sshpass
RUN apk add openssh
RUN sshpass -p $DEPLOY_PASS ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$HOSTING_DOMAIN "rm -rf $TARGET_DIR/$SITE_PATH/*"
RUN sshpass -p $DEPLOY_PASS ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$HOSTING_DOMAIN "mkdir -p $TARGET_DIR/$SITE_PATH"
RUN sshpass -p $DEPLOY_PASS scp -o StrictHostKeyChecking=no -r ./public/* $DEPLOY_USER@$HOSTING_DOMAIN:$TARGET_DIR/$SITE_PATH
