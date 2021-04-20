#!/bin/bash


contentimagefile="pass0-Sketch__2101240002__01_cc01-redraw.jpg"
contentimagefile="pass0-Sketch__2101240002__01_cc01-redraw-2k.jpg"
contentimagefile="pass0-Sketch__2101240002__01_cc01-redraw-1k.jpg"

#--------------------------

export callhost="as.guillaumeisabelle.com"
export callhost="orko.guillaumeisabelle.com"
export callhost="compai.guillaumeisabelle.com"
export requestFile="request.json"
#export requestFile="request-0014.json"

export callContentType="Content-Type: application/json"

echo "Current Service host is : $callhost"


export resulthtml=results.html

# Scripting we call
export nodepostscripting="node ../util_decode_base64_to_html_tag.js"
export node_util_cat_contentImage="node ../util_cat_contentImage_json.js"
export nodeimg2stylizationrequest="node ../img2stylizationRequest.js"