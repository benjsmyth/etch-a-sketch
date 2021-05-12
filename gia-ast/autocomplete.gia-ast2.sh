###-begin-gia-ast2-completions-###
#
# yargs command completion script
#
# Installation: gia-ast2 completion >> ~/.bashrc
#    or gia-ast2 completion >> ~/.bash_profile on OSX.
#
alias gia-ast2="$srcpath/x__etch-a-sketch__210224/gia-ast/x__yargs_cmd_210511.js "

_yargs_completions()
{
    local cur_word args type_list

    cur_word="${COMP_WORDS[COMP_CWORD]}"
    args=("${COMP_WORDS[@]}")

    # ask yargs to generate completions.
    type_list=$(gia-ast2 --get-yargs-completions "${args[@]}")

    COMPREPLY=( $(compgen -W "${type_list}" -- ${cur_word}) )

    # if no match was found, fall back to filename completion
    if [ ${#COMPREPLY[@]} -eq 0 ]; then
      COMPREPLY=()
    fi

    return 0
}
complete -o default -F _yargs_completions gia-ast2
###-end-gia-ast2-completions-###

###-begin-gia-ast2s-completions-###
#
alias gia-ast2s="$srcpath/x__etch-a-sketch__210224/gia-ast/x__yargs_cmd_210511_SIMPLE.js "

_yargs_completions2s()
{
    local cur_word args type_list

    cur_word="${COMP_WORDS[COMP_CWORD]}"
    args=("${COMP_WORDS[@]}")

    # ask yargs to generate completions.
    type_list=$(gia-ast2s --get-yargs-completions "${args[@]}")
    #echo "$type_list"
    COMPREPLY=( $(compgen -W "${type_list}" -- ${cur_word}) )

    # if no match was found, fall back to filename completion
    if [ ${#COMPREPLY[@]} -eq 0 ]; then
      COMPREPLY=()
    fi

    return 0
}
complete -o default -F _yargs_completions2s gia-ast2s
complete -o default -F _yargs_completions2s $srcpath/x__etch-a-sketch__210224/gia-ast/x__yargs_cmd_210511_SIMPLE.js
###-end-gia-ast2s-completions-###


###-begin-gia-ast3s-completions-###
#
alias gia-ast3s="$srcpath/x__etch-a-sketch__210224/gia-ast/x__yargs_cmd_210512_ast3s.js"

_yargs_completions3s()
{
    local cur_word args type_list

    cur_word="${COMP_WORDS[COMP_CWORD]}"
    args=("${COMP_WORDS[@]}")

    # ask yargs to generate completions.
    type_list=$(gia-ast3s --get-yargs-completions "${args[@]}")
    #echo "$type_list"
    COMPREPLY=( $(compgen -W "${type_list}" -- ${cur_word}) )

    # if no match was found, fall back to filename completion
    if [ ${#COMPREPLY[@]} -eq 0 ]; then
      COMPREPLY=()
    fi

    return 0
}
complete -o default -F _yargs_completions3s gia-ast3s
complete -o default -F _yargs_completions3s $srcpath/x__etch-a-sketch__210224/gia-ast/x__yargs_cmd_210512_ast3s.js
###-end-gia-ast3s-completions-###

