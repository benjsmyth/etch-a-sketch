dockertag=guillaumeai/ast:etchai
containername=etchai
dkhostname=$containername

#dkrunmode="bg" #default fg
#dkrestart="--restart" #default
#dkrestarttype="unless-stopped" #default

dkport=8080:8080

#dkvolume="myvolname220413:/app" #create or use existing one
#dkvolume="$containername:/app" #create with containername name

#dkecho=true #just echo the docker run

#dkcommand=bash #command to execute (default is the one in the dockerfile)

#dkextra="MY EXTRA ARGS"

#dkmounthome=true

#xmount=/tmp:/a/tmp
#xmount2=/var:/a/var

#####################################
#Build related
#
##chg back to that user
#dkchguser=vscode

