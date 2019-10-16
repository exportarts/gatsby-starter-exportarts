#!/bin/bash

# First parameter must be the sentry auth token!
# Second parameter must be the project name!
# Third parameter must be the environment!

# Assumes you're in a git repository
export SENTRY_AUTH_TOKEN=$1
export SENTRY_ORG=exportarts
VERSION=$(sentry-cli releases propose-version)

# Create a release
sentry-cli releases new -p $2 $VERSION --finalize

# Associate commits with the release
sentry-cli releases set-commits --auto $VERSION

# Create a deployment
sentry-cli releases deploys $VERSION new -e $3
