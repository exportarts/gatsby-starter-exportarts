FROM node:10

ARG DEPLOY_USER
ARG DEPLOY_PASS
ARG PRISMIC_API_KEY
ARG HOSTING_DOMAIN
ARG TARGET_DIR
ARG BRANCH_NAME

WORKDIR /build
COPY . .

# Install packages
RUN apt-get -yq update 1>/dev/null && \
    apt-get -yq upgrade 1>/dev/null && \
    apt-get -yq install php sshpass 1>/dev/null

# Install dependencies
RUN yarn install --frozen-lockfile --non-interactive

# Build
RUN export BRANCH_NAME=${BRANCH_NAME} && \
    export PRISMIC_API_KEY=${PRISMIC_API_KEY} && \
    yarn build --no-color

# Deploy
RUN sshpass -p $DEPLOY_PASS ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$HOSTING_DOMAIN "rm -rf $TARGET_DIR/$BRANCH_NAME/*" && \
    sshpass -p $DEPLOY_PASS ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$HOSTING_DOMAIN "mkdir -p $TARGET_DIR/$BRANCH_NAME" && \
    sshpass -p $DEPLOY_PASS scp -o StrictHostKeyChecking=no -r ./public/* $DEPLOY_USER@$HOSTING_DOMAIN:$TARGET_DIR/$BRANCH_NAME
