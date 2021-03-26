#!/bin/bash

source _env.sh


## Browsing
echo "Initializing: $resulthtml"


echo "<hr>$(date)<hr>" >> $resulthtml
echo "<h2>Content image: </h2>" >> $resulthtml
$node_util_cat_contentImage $requestFile --html  >> $resulthtml
echo "<br><hr>" >> $resulthtml
