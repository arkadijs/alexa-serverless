#!/bin/sh -x
exec curl -w \\n -X POST --data-binary @event.json -H 'Content-Type: application/json' \
  https://90rhzrhpq6.execute-api.eu-west-1.amazonaws.com/dev/workshop
