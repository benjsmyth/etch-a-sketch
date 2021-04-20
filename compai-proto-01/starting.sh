#!/bin/bash

source _env.sh

#
echo "Creating the request file using contentimage: $contentimagefile"
sleep 1
$nodeimg2stylizationrequest $contentimagefile $requestFile


## Browsing
echo "Initializing: $resulthtml"


echo "<hr>$(date)<hr>" >> $resulthtml
echo "<h2>Content image: </h2>" >> $resulthtml
# Cat our request contentIMage in the resultHTML for viewing
$node_util_cat_contentImage $requestFile --html  >> $resulthtml

echo "<br><hr>" >> $resulthtml
