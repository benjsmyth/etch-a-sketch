#!/bin/bash

export callhost="as.guillaumeisabelle.com"
export callhost="orko.guillaumeisabelle.com"
export requestFile="request2.json"
#export requestFile="request-0014.json"

export callContentType="Content-Type: application/json"

echo "Current Service host is : $callhost"


export resulthtml=results.html

# Scripting we call
export nodepostscripting="../util_decode_base64_to_html_tag.js"
export node_util_cat_contentImage="../util_cat_contentImage_json.js"
