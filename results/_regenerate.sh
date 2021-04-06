#!/bin/bash

# Regenerating the INDEX
echo "# Results  " > README.md
echo "  ">> README.md

for f in *png *jpg *jpeg
do 
	echo '![]('$f')  ' >> README.md
done 

git add * 
git commit . -m chg:updated-result
git pull
git push
