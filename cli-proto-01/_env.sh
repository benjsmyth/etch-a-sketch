#!/bin/bash

export resultSuffix='__stylize__'
export modelid=30

export callhost="as.guillaumeisabelle.com"
export callhost="orko.guillaumeisabelle.com"
#export callhost="compai.guillaumeisabelle.com"
#export callhost="gaia.guillaumeisabelle.com"

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


# Using npmjs ClI : npm i gia-ast-util --g
export nodepostscripting="gia-ast-response-stylizedImage2file"
export node_util_cat_contentImage="gia-ast-cat-contentImage"
export nodeimg2stylizationrequest="gia-ast-img2stylize-request"

# Loads an ENV for the current host if exist
hostenvfile="_henv_$HOSTNAME.sh"
if [ -f $hostenvfile ]; then
    . ./$hostenvfile
else
    echo " ./$hostenvfile does not exist, create it if you require to define specific to platform variable or overwrite some."
fi
