#!/bin/bash

source _env.sh

# Making the Stylization using the server
./client-stylizer-call.sh

echo "Client call and post processing done"
sleep 1
## Browsing
gixb $resulthtml

