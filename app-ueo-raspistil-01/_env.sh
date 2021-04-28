#!/bin/bash

# Choose from one of these hosts
export callhost="as.guillaumeisabelle.com"
export callhost="orko.guillaumeisabelle.com"

export requestFile="request.json"
#export requestFile="request-0014.json"

export callContentType="Content-Type: application/json"


export resulthtml=results.html

# Scripting we call
export nodepostscripting="node ../util_decode_base64_to_html_tag.js"
export node_util_cat_contentImage="node ../util_cat_contentImage_json.js"
export node_base64_contentImage_request_maker="node ../img2stylizationRequest.js"
