#!/bin/bash


# Prep context
export callmethod="stylize"
export responseBase=response$callport
export callurl="http://$callhost:$callport/$callmethod"
export responseFile=$responseBase.json
export responseImage=$responseBase.jpg


echo "Calling : $modelinfo on port: $callport"
echo "RequestFile: $requestFile"
echo "CallURL: $callurl"
echo "Output Responses: $responseFile"

echo curl --header  \"$callContentType\"  --request POST   --data @$requestFile $callurl --output $responseFile

# Call the modeling service
curl --header  "$callContentType"  --request POST   --data @$requestFile $callurl --output $responseFile

# Post process response
echo "Calling post scripting: $nodepostscripting"
echo "  It will convert: $responseFile to $responseImage and generate HTML in : $resulthtml"

echo "$nodepostscripting  $responseFile $responseImage --html  >> $resulthtml"

echo "<hr><h2>$modelinfo</h2>" >> $resulthtml
$nodepostscripting  $responseFile $responseImage --html  >> $resulthtml

# cleanup
#rm $responseFile

echo "."


