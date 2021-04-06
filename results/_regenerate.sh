#!/bin/bash

# Regenerating the INDEX
echo "# Results  " > README.md
echo "  ">> README.md

dropdir=/home/jgi/Desktop
fpattern=SmallCreation
mvcmd="git mv"

# copy drop dir pattern in here
cp $dropdir/$fpattern* .

for f in *png *jpg *jpeg
do 
	ff=$(echo $f | tr " " "_")
	$mvcmd '"'$f'"' $ff || mv '"'$f'"' $ff || echo "Something happened with : $f"

	echo '![]('$ff')  ' >> README.md
done 

git add * 
git commit . -m chg:updated-result
git pull
git push
