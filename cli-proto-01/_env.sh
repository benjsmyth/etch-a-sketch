#!/bin/bash

export resultSuffix='__stylize__'
export modelid=30

export callhost="as.guillaumeisabelle.com"
export callhost="orko.guillaumeisabelle.com"
export callhost="compai.guillaumeisabelle.com"
export callprotocol="http"
export ext_target=jpg

#-------End of customizable---
export callmethod="stylize"

export contentimagefile="$1"
# export callport=9030
export callportbase=90
msg=""
if [ "$2" ==  "" ] ; then
	echo "default modelid:$modelid used. (specify as second argument the ID of the model"
else
	echo "ModelID input is: $2"
   export modelid=$2
fi
export callport=$callportbase$modelid



export contentimagefileBasename=${contentimagefile%.*}

export resultFileTargetBase=$contentimagefileBasename$resultSuffix

echo $contentimagefileBasename

#--------------------------

export resulthtml="$TMP/results.html"


export requestFile="$TMP/request.json"
#export requestFile="request-0014.json"

export callContentType="Content-Type: application/json"

echo "Current Service host is : $callhost"



# Scripting we call
export nodepostscripting="node $DIR/util_decode_base64_to_html_tag.js"
export node_util_cat_contentImage="node $DIR/util_cat_contentImage_json.js"
export nodeimg2stylizationrequest="node $DIR/img2stylizationRequest.js"
