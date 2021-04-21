#!/bin/bash

export CDIR=$(pwd)
export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source $DIR/_env.sh $1 $2

export chost=A
for p in $ports
do
	echo "Stylizing $1 using model on Port ID: $p"
	source $DIR/build.sh $1 $p
done
