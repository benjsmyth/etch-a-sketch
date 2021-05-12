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
  .command('list', 'List available model',
    (yargs) => {
      return yargs
    }, (argv) => {
      if (argv.verbose) 
      console.info(`Listing`)
      listing();
    })
  .command('stylize [file] [port]', 'start the astr', (yargs) => {
    return yargs
      .positional('file', {
        describe: 'file to stylize',
        type: 'string',
        default: '.'
      })
      .positional('port', {
        describe: 'port to bind on',
        default: 52
      })
  }, (argv) => {
    if (argv.verbose) console.info(`Infering on :${argv.port} for file: ${argv.file}`)
    ast(argv.file, argv.port)
  })
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
  .argv;

// console.log(argv._);
// console.log(argv);



function ast(file, port) {
  console.log("Stylizing using port : " + port + " for file: " + file);
  if (argv.directory) console.log("--directory");
}

//const url = "https://jsonplaceholder.typicode.com/posts/1";


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