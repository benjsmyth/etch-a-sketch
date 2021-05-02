#!/bin/bash

img=IMG_0019.JPG
ext=JPG
p=71
outres=1280
outdir=./build
mkdir -p $outdir

astfilesuffix='__stylized__'
outbasesuffix='__'
fb=${img%.*}
outbase=$fb$astfilesuffix$p
out=$outbase.$ext
soutbase=$outdir/$outbase$outbasesuffix
s=./gia-ast.js
rezs="64 96 128 160"
echo "A file : $img stylized on port:$p"
echo " - will result in : $out"
echo " - that will upres at : $outres "
echo " - to a sequence filebase : $soutbase "
echo " - foreach of those rez: $rezs"
#exit 1
c=1
cres=48
rezs="$cres "
increment=16
for i in {1..80};do cres=$( expr $cres + $increment);rezs+="$cres ";done
echo $rezs
#exit 1
for r in $rezs 
do 
	echo "-----$r------"
	$s $img $p $r
	cc=`printf %03d $c`
   tfile=$soutbase$cc.$ext
	convert -geometry $outres'x' $out $tfile
	c=$( expr $c + 1)
done
