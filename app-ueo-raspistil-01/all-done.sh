#!/bin/bash

source _env.sh


## Browsing
echo "Browsing url: $resulthtml"
gixb "$resulthtml" || echo "see results.html"


