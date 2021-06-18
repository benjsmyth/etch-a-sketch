
#$astcallmethod    $asthostname      $astoutsuffix     $astportrange     
#$astcallprotocol  $astiaarn         $astportbase      $astwwwhost   
export astportbase=91
export astportrange=$astportbase
export astcallprotocol=https
export asthostname=api.astia.xyz

node https-gia-ast.js sample.jpg 41
