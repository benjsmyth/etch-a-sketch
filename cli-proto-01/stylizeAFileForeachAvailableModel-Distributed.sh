#!/bin/bash
# distributed version
export CDIR=$(pwd)
export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source $DIR/_env.sh $1 $2

export callhost=$callhostA
export chost=$callhostB
for p in $ports
do
	#echo "# $p"
	#echo "Stylizing $1 using model on Port ID: $p and host $callhost"
	source $DIR/build.sh $1 $p &
	if [ "$chost" == "$callhost" ] ;
	 then
		#echo "DEBUG::We are already infering with Host $callhost"
		#Switching host for next iteration
		#echo "Switching to Host B"
		export callhost=$callhostA
	else
		#echo "Switching to Host A"
		export callhost=$callhostB
	fi
	##echo "sleep $astiaDistributedAverageSwitchTimeframe #Average time for infering with those hosts"
	sleep $astiaDistributedAverageSwitchTimeframe #Average time for infering with those hosts
done
