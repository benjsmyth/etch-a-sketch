#!/usr/bin/env node

//@STCGoal A command with two positional args



const yargs = require('yargs');
var ver = yargs.version();

var appStartMessage = 
`Mastery Yargs
By Guillaume Descoteaux-Isabelle, 2020-2021
version ${ver}
----------------------------------------`;
//const { argv } = require('process');
//const { hideBin } = require('yargs/helpers')
const argv = yargs(process.argv)

.scriptName("gia-ast")
.usage(appStartMessage)
   .command('serve [port]', 'start the server', (yargs) => {
     yargs
       .positional('port', {
         describe: 'port to bind on',
         type:'string',
         default: 5000
       })
   }, (argv) => {
     if (argv.verbose) console.info(`start server on :${argv.port}`)
     //serve(argv.port)
     console.log("test");
     console.info(`start server on :${argv.port}`)
   })
   .option('file', {
     alias: 'f',
     type: 'string',
     description: 'Specify the file out'
   })
   .option('directory', {
     alias: 'd',
     type: 'boolean',
     default:false,
     description: 'Name the output using current Basedirname'
   }).usage(`gis-csm -d --label  # Assuming this file in directory: vm_s01-v01_768x___285k.jpg
   # will extract 285 and add that instead of filename`)
   .option('verbose', {
     alias: 'v',
     default:false,
     type: 'boolean',
     description: 'Run with verbose logging'
   })
   .option('label', {
     alias: 'l',
     type: 'boolean',
     default:false,
     description: 'Label using last digit in filename (used for parsing inference result that contain checkpoint number)'
   })
 .argv;

// console.log(argv._);
// console.log(argv);
