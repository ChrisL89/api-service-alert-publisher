#!/usr/bin/env bash
set -euo pipefail

QUEUE="${QUEUE:-queue: greenmoon-ops}"

cat <<EOF
steps:
  - name: ':pizza:  Build'
    command:
      - make build-docker
    agents:
      ${QUEUE}
  - wait
  - name: ':fries:  Test'
    command:
      - make ci-test
    agents:
      ${QUEUE}
  - wait
  - name: ':hamburger:  Publish Artifact Dev'
    command:
      - make ci-publish
    agents:
      ${QUEUE}
  - wait
  - block: ":beers: Unblock Step"
  - name: ':rocket:  Promote Artifact Prod'
    command:
      - make ci-promote
    agents:
      ${QUEUE}
EOF