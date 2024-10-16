#!/bin/sh

ASSETS=/usr/src/front-ssr/browser/assets
# here we replace the environment variables
# provided to the docker container by generating a new temporary file.
envsubst < $ASSETS/env.template.json > $ASSETS/env.json
# then we replace the original env file.
#mv $ASSETS/env.tmp $ASSETS/env.json
node server/server.mjs

exec "$@"