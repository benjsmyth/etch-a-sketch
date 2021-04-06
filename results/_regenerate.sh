#!/bin/bash

# Regenerating the INDEX
echo "# Results  " > README.md
echo "  ">> README.md

dropdir=/home/jgi/Desktop
fpattern=SmallCreation
mvcmd="git mv"

# copy drop dir pattern in here
cp $dropdir/$fpattern* .

# Fixing naming
for f in *png *jpg *jpeg
do
        ff=$(echo $f | tr " " "_")
	echo "Processing: $f into "
	echo "...$ff"

        $mvcmd '"'$f'"' $ff
	mv '"'$f'"' $ff 
	#echo "Something happened with : $f"
	echo "$ff ... done"

done
echo "-------------------Fixed names and migrating drop in here done----"
echo "--------------------------------------------------------------------"

for f in *png *jpg *jpeg
do 

	echo '![]('$f')  ' >> README.md
done 

echo "---------INDEX Regenerated----------"
echo "--------------------------------------"
echo "--- Commiting and pushing results to repo---"
git add * 
git commit . -m chg:updated-result
git pull
git push
