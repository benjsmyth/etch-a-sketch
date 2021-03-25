#!/bin/bash

source _env.sh
export infile="$1"
node ../img2stylizationRequest.js  /home/pi/Desktop/cap.jpg request.json
