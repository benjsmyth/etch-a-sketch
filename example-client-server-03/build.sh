#!/bin/bash

# Making the Stylization using the server
source client-stylizer-call.sh

# an output HTML with results
resulthtml=results.html

# POST
echo "<hr>"  >> $resulthtml
echo "<h3>$(date)</h3>"  >> $resulthtml
echo "<hr>"  >> $resulthtml
echo "<h1>Picasso</h1>"  >> $resulthtml
node ../util_decode_base64_to_html_tag.js response2.json response2.jpg --html >> $resulthtml
echo "<hr>"  >> $resulthtml
echo "<h1>Kandinsky</h1>"  >> $resulthtml
node ../util_decode_base64_to_html_tag.js response2w.json response2w.jpg --html  >> $resulthtml

## Browsing
gixb $resulthtml

