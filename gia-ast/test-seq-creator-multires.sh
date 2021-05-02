#!/bin/bash
if [ "$1" == "--help" ]; then
	echo "$0 [IMGFile] [modelPort]"
	echo "$0 [IMGFile] [modelPort] outres increment seqStart startRes quality   "
	exit
fi

img=IMG_0014.jpg
if [ "$1" != "" ]; then img=$1;fi
p=12
if [ "$2" != "" ]; then p=$2;fi

ext="${img##*.}"
echo $img
echo $ext
echo $p

outdir=./build
mkdir -p $outdir

astfilesuffix='__stylized__'
outbasesuffix='__'
fb=${img%.*}
outbasedir=$fb$astfilesuffix$p
outbase=$fb$astfilesuffix$p
out=$outbase.$ext
outdirpath=$outdir/$outbasedir
soutbase=$outdirpath/$outbase$outbasesuffix
s=./gia-ast.js
rezs="64 96 128 160"
#exit 1
outres=1280;if [ "$3" != "" ]; then outres=$3;fi
increment=8;if [ "$4" != "" ]; then increment=$4;fi
c=1;if [ "$5" != "" ]; then c=$5;fi
cres=24;if [ "$6" != "" ]; then cres=$6;fi
quality=99;if [ "$7" != "" ]; then quality=$7;fi
RGS=1;if [ "$8" != "" ]; then RGS=$8;fi
RGE=240;if [ "$9" != "" ]; then RGE=$9;fi

rezs="$cres "
for i in $(seq $RGS $RGE);do cres=$( expr $cres + $increment);rezs+="$cres ";done
echo "A file : $img stylized on port:$p"
echo " - will result in : $out"
echo " - that will upres at : $outres "
echo " - to a sequence filebase : $soutbase "
echo " - foreach of those rez: $rezs"
echo " - in created subdir :$outdirpath  "

mkdir -p $outdirpath

for r in $rezs 
do 
	echo "-----$r------"
	resizeform=$outres'x'
	cc=`printf %03d $c`
   tfile=$soutbase$cc.$ext
	convertcmd="convert -quality $quality -geometry $resizeform $out $tfile"
	echo $s $img $p $r  &&\
	$s $img $p $r  &&\
echo	$convertcmd &&\
	$convertcmd || exit 1
	c=$( expr $c + 1)
done
