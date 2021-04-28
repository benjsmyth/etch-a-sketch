#!/bin/bash


# vars
source _env.sh

## Picawill (Pass1)
export modelinfo="Picawill v05.150ik"
export callport=9030
source ./__launch-call.sh
#backup the request
mv $requestFile request-pass0.json

# Making a new request
echo "Convert the result pass1 into a request"
echo $nodeimg2stylizationrequest $responseImage $requestFile
sleep 1
$nodeimg2stylizationrequest $responseImage $requestFile
sleep 1

# Cat our request contentIMage in the resultHTML for viewing
echo "<hr><h1>Passs 1 content</h1>" >> $resulthtml
#$node_util_cat_contentImage $requestFile --html  >> $resulthtml


## Picawill (pass 2)
export modelinfo="Picawill v03.120ik"
export callport=9031
source ./__launch-call.sh

