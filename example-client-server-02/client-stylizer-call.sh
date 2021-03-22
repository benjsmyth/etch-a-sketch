
# vars

## Picasso
export callport=9000

export callhost="as.guillaumeisabelle.com"
export callurl="http://$callhost:$callport/stylize"

## simple call JSON with "contentImage" with Encoded base64
### "contentImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."}
requestFile=request2.json


#--------------------------------------------
responseFile=response2.json

# Make the call
echo "Calling $callurl using curl..."
sleep 1

curl --header  "$callContentType"  --request POST   --data @$requestFile $callurl --output $responseFile

# Calling with another server (style)
echo "Calling to stylize using Kandinsky..."
responseFile=response2w.json
## Kandinsky
export callport=9001
export callurl="http://$callhost:$callport/stylize"
curl --header  "$callContentType"  --request POST   --data @$requestFile $callurl --output $responseFile

# Response
## {"stylizedImage":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4..."}
