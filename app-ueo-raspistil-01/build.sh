#!/bin/bash

./_env.sh

./starting.sh

# Making the Stylization using the server
./client-stylizer-call.sh

echo "Client call and post processing done"



source all-done.sh
