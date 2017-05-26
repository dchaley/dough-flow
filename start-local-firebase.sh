#!/bin/bash

if [ "$1" == "test" ]; then
  PORT=5556
else
  PORT=5555
fi

firebase-server -p $PORT -f test/firebase.json

