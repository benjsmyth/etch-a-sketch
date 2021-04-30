
export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export ports="51 52 53 54 55 56"
export script=$DIR/_run-test07.sh

for p in $ports ; do source $script $p $1 ; done
