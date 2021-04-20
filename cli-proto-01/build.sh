#!/bin/bash

export CDIR=$(pwd)
export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source $DIR/_env.sh $1 $2

source $DIR/starting.sh
echo "Pre-processing done"

# Making the Stylization using the server
source $DIR/client-stylizer-call.sh

echo "Stylization done"
sleep 1

source $DIR/all-done.sh
echo "Post processing done"
