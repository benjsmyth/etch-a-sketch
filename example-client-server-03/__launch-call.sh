#!/bin/bash


# Prep context
export resulthtml=results.html
export callmethod="stylize"
export responseBase=response$callport
export callurl="http://$callhost:$callport/$callmethod"
export responseFile=$responseBase.json
export responseImage=$responseBase.jpg
export nodepostscripting="../util_decode_base64_to_html_tag.js"


echo "Calling : $modelinfo on port: $callport"
echo "RequestFile: $requestFile"
echo "CallURL: $callurl"
echo "Output Responses: $responseFile"

echo curl --header  \"$callContentType\"  --request POST   --data @$requestFile $callurl --output $responseFile
sleep 1
# Call the modeling service
curl --header  "$callContentType"  --request POST   --data @$requestFile $callurl --output $responseFile

# Post process response
echo "Calling post scripting: $nodepostscripting"
echo "  It will convert: $responseFile to $responseImage and generate HTML in : $resulthtml"
sleep 1
echo "node $nodepostscripting  $responseFile $responseImage --html  >> $resulthtml"

node $nodepostscripting  $responseFile $responseImage --html  >> $resulthtml

# cleanup
#rm $responseFile

echo "."


