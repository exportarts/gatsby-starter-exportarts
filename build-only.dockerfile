FROM node:10

ARG PRISMIC_API_KEY
ARG BRANCH_NAME

WORKDIR /build
COPY . .

# Install missing packages
RUN apt-get -yq update 1>/dev/null && \
    apt-get -yq upgrade 1>/dev/null && \
    apt-get -yq install php 1>/dev/null

# Install dependencies
RUN yarn install --frozen-lockfile --non-interactive

# Build
RUN export PRISMIC_API_KEY=${PRISMIC_API_KEY} \
    && export BRANCH_NAME=${BRANCH_NAME} \
    && yarn build --noColor
