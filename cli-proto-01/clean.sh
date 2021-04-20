#!/bin/bash

echo "Cleaning up responses..."
for r in response*; do rm $r;done
echo "...DONE"

echo "Cleaning the results.html file..."
echo " " > results.html
echo "...DONE"
