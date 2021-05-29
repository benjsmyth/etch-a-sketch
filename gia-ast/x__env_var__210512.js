#!/usr/bin/env node

//@STCGoal Env var can be read as argument or specified.
//@STCStatus NOT WORKING AS EXPECTED

const { hideBin } = require('yargs/helpers')

console.log(process.env.HOME)
var argv = require('yargs/yargs')(process.argv.slice(2))
.env('asthostname')
.option('asthostname', {
  alias: 'h'
})
.argv;

console.log(hideBin(process.argv));
console.log(argv.asthostname)

