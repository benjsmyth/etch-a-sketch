#!/bin/bash

source _env.sh
export infile="$1"

$node_base64_contentImage_request_maker  $infile $requestFile

