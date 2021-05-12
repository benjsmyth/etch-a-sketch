#!/usr/bin/env node

//@STCGoal A command with two positional args

// const fetch = require('node-fetch');
const http = require("http");
var url = "http://jgwill.com/data/dkrunningcontainerports.txt";

const fs = require("fs");

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

var list = "";
var prettyList = "";
var servers = new Object();
var ports = new Object();
var arrComplete = [
  'ast',
  'list',
  'ls',
  'stylize'
];
//var ver = yargs.version();
var mode = "NONE";
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

  .command('list [hostname]', 'List available model',
    (yargs) => parseList(yargs), (argv) => parseListArgv(argv))
  .command('list [hostname]', 'List available model',
    (yargs) => parseList(yargs), (argv) => parseListArgv(argv))

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
  .completion('completion', function (current, argv) {
    if (argv._[0] == "ast")
    return ["ast_xfp","compo_eou"];
    
    return arrComplete;
  })
  .argv;
function showAstCompletion() {
  console.log("ast FILE ModelPort");
}
// console.log(argv._);
// console.log(argv);
//console.log(argv.label ? "Labels":"");


function ast(file, port, hello = null) {
  console.log("Stylizing using port : " + port + " for file: " + file);
  if (argv.directory) console.log("--directory");
  if (hello) console.log(`Hello: ${hello}`);
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

function parseListArgv(argv) {
  if (argv.verbose) console.info(`Listing`)
  listing(argv.hostname);
}
function parseList(yargs) {
  mode = "LIST";
  // .alias('ast [file] [port]')
  return yargs.positional('hostname', {
    describe: 'hostname',
    type: 'string',
    default: 'ENV'
  })
    .positional('port', {
      describe: 'port to look for',
      default: 80
    });
}

function listing(cb=null,hostname = "ENV", port = 80) {
  //console.log("Listing available model. ");
  var callurl = url;
  if (hostname == "ENV") hostname = process.env.asthostname;
  callurl = "http://" + hostname + ":" + port + "/data/dkrunningcontainerports.txt";
 // console.log(hostname);
 // console.log(port);
 // console.log(callurl);
  try {

    http.get(callurl, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("error", err => {
        console.log(err.message);
      });
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        // body = JSON.parse(body);
        list = "";
        prettyList = "";

        servers = new Object();
        ports= new Object();
        //console.debug(body);
        var arr = body.split(" ");
        arr.forEach(a => {
          var iarr = a.replace("\n","").split(":");
          var p = iarr[0];
          var c = iarr[1];
          servers[c] =p; 
          ports[p] = c;
          var l = `${p}\t ${c}`;
          list += a + " ";
          prettyList += l  + "\n";
         
        });
        var r = new Object();
        //r.ports = ports;
        //r.servers = servers;
        r = {ports,servers,list,body};

        if (mode=="LIST") console.info(prettyList);
        //else console.log(list);
        if (cb && typeof cb === "function") cb (r);
      });
    });
  } catch (error) {
      console.log(error.message)
  }

  // fetch(url)
  //   .then(res => res.text())
  //   .then(text => console.log(text));

  // console.log("done")
}