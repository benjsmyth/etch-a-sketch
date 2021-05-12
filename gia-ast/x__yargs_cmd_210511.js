#!/usr/bin/env node

//@STCGoal A command with two positional args

// const fetch = require('node-fetch');
const http = require("http");
var url = "http://jgwill.com/data/dkrunningcontainerports.txt";


const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')



//var ver = yargs.version();

var appStartMessage =
  `Mastery Yargs
By Guillaume Descoteaux-Isabelle, 2020-2021
version 
----------------------------------------`;
const { argv } = require('process');
// const { hideBin } = require('yargs/helpers')
//const argv = yargs(process.argv)
// .scriptName("gia-ast2")
// .usage(appStartMessage)   
yargs(hideBin(process.argv))

  .scriptName("gia-ast2")
  .usage(appStartMessage)

  .command('list', 'List available model',
    (yargs) => yargs, (argv) => listing())
  .command('ls', 'List avilable model',
    (yargs) => yargs, (argv) => listing())
  .command('stylize [file] [port]', 'start the astr', (yargs) => parseAst(yargs), (argv) => parseAstArgv(argv))
  .command('ast [file] [port]', 'start the astr', (yargs) => parseAst(yargs), (argv) => parseAstArgv(argv))
  .option('directory', {
    alias: 'd',
    type: 'boolean',
    default: false,
    description: 'Name the output using current Basedirname'
  })

  .option('verbose', {
    alias: 'v',
    default: false,
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .option('label', {
    alias: 'l',
    type: 'boolean',
    default: false,
    description: 'Label using last digit in filename (used for parsing inference result that contain checkpoint number)'
  }) 
   .completion('completion', function(current, argv) {
    // 'current' is the current command being completed.
    // 'argv' is the parsed arguments so far.
    // simply return an array of completions.
    //console.log(current);
    return [
      'ast',
      'list',
      'ls',
      'stylize'
    ];
  })
  .argv;

// console.log(argv._);
// console.log(argv);
//console.log(argv.label ? "Labels":"");


function ast(file, port) {
  console.log("Stylizing using port : " + port + " for file: " + file);
  if (argv.directory) console.log("--directory");
}

//const url = "https://jsonplaceholder.typicode.com/posts/1";

function parseAstArgv(argv) {
  if (argv.verbose) console.info(`Infering on :${argv.port} for file: ${argv.file}`)
  ast(argv.file, argv.port);
}
function parseAst(yargs) {
  // .alias('ast [file] [port]')
  return yargs.positional('file', {
    describe: 'file to stylize',
    type: 'string',
    default: '.'
  })
    .positional('port', {
      describe: 'port to bind on',
      default: 52
    });
}

function listing() {
  console.log("Listing available model. ");

  http.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      // body = JSON.parse(body);
      //console.debug(body);
      var arr = body.split(" ");
      arr.forEach(a => {
        var iarr = a.split(":");
        var p = iarr[0];
        var c = iarr[1];
        console.info(`On port ${p}\t Container ${c}`);
      });
    });
  });

  // fetch(url)
  //   .then(res => res.text())
  //   .then(text => console.log(text));

  // console.log("done")
}