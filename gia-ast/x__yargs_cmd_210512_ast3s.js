#!/usr/bin/env node

//@STCGoal A command with two positional args

// const fetch = require('node-fetch');
const http = require("http");
var url = "http://jgwill.com/data/dkrunningcontainerports.txt";
const urlexist = require("url-exists");
const dns = require('dns');

const fs = require("fs");
//const process = require("process").process;

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
  'stylize',
  'completion'
];

//var ver = yargs.version();
var mode = "NONE";
var appStartMessage =
  `Mastery Yargs
By Guillaume Descoteaux-Isabelle, 2020-2021
version 
----------------------------------------`;
const { argv, exit } = require('process');
// const { exit } = require("node-process");

// const { hideBin } = require('yargs/helpers')
//const argv = yargs(process.argv)
// .scriptName("gia-ast2")
// .usage(appStartMessage)   
yargs(hideBin(process.argv))

  .scriptName("gia-ast2")
  .usage(appStartMessage)
  .epilogue('for more information, find our manual at http://guillaumeisabelle.com')

  .command('list [hostname]', 'List available model',
    (yargs) => parseList(yargs), (argv) => parseListArgv(argv))
  .command('list [hostname]', 'List available model',
    (yargs) => parseList(yargs), (argv) => parseListArgv(argv))
    .example("$0 list as.jgwill.com","#List the models being served at that host")

  .command('stylize [file] [port]', 'start the astr', (yargs) => parseAst(yargs), (argv) => parseAstArgv(argv))
  .example("$0 ast sample.jpg 98", "# Stylize using model id 98")

  .command('ast [file] [port]', 'start the astr', (yargs) => parseAst(yargs), (argv) => parseAstArgv(argv))
  .option('directory', {
    alias: 'd',
    type: 'boolean',
    default: false,
    description: 'Name the output using current Basedirname'
  })

  .option('pretty', {
    default: false,
    type: 'boolean',
    description: 'Changes the output'
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

  .completion('completion', function (current, argv2, done) {

    //console.log("Current-" + current);
    // console.log("1:"+argv2._[1]);
    // console.log("2:"+argv2._[2]);
    var gotFile = false;
    try {
      if (fs.existsSync(argv2._[2])) gotFile = true;

    } catch (error) {

    }
    //if (gotFile)console.log("Got a file");

    if (current == "list" || current == "ls" || argv2._[1] == "list") {
      //console.log("Going in LIST")
      done(getAstHosts());
    }


    if (current != "ast" && current != "stylize" && argv2._[1] != "ast" && argv2._[1] != "stylize") done(arrComplete);

    // else console.log("Going in ast")
    setTimeout(function () {
      // console.log("--" + current);
      if (argv2._[1] == "ast" || argv2._[1] == "stylize") {
        ast("ENV", 80, (r) => {
          //console.log(r);
          done(r);
        });
      }
      else {

        // console.log("->"+argv[2]+"<-");
        //console.log(current);
        if (argv2._[2] != "--get-yargs-completions" && argv2._[1] != "ast") {

          mode = "NONE";
          console.log('mode:NONE');
          done(arrComplete);
        }
      }


    }, 444);
    // return arrComplete;
    return ['ast',
      'list',
      'ls',
      'stylize',
      'complete'];
  })
  // .completion('completion', function (current, argv, done) {

  //   // return ["ast_xfp","compo_eou"];
  //   setTimeout(function () {

  //     if (argv._[0] == "ast") {
  //       listing(function (r) {
  //         // console.log(r.ports);
  //         var o = "";
  //         count = 0;
  //         arr = [];
  //         for (const [key, value] of Object.entries(r.ports)) {
  //           //console.log(`${key}: ${value}`);
  //           o += `${key}: ${value}\n`;
  //           arr[count] = value;
  //           count++;
  //         }
  //         done(arr);
  //       });
  //     }
  //     else return arrComplete;

  //   }, 500);
  //   return arrComplete;
  // })
  .argv;


function showAstCompletion() {
  // console.log("ast FILE ModelPort");
}
// console.log(argv._);
// console.log(argv);
//console.log(argv.label ? "Labels":"");

function getAstHosts() {
  return ['orko',
    'as',
    'gaia',
    'custom'];
}

function ast(file, port, cb = null) {
  //console.log("->"+argv[2]+"<-");
  //console.log("->"+argv[1]+"<-");
  if (argv[2] == "--get-yargs-completions") {
    setTimeout(function () {
      listingAsArray((r) => {
        //console.log(r);
        if (cb && typeof cb === "function")
          cb(r);
        //exit();
        //return;
      });
    }, 333);
  }
  else {

    console.log("Stylizing using port : " + port + " for file: " + file);
    if (argv.directory) console.log("--directory");
  }
  //if (hello) console.log(`Hello: ${hello}`);
}

//const url = "https://jsonplaceholder.typicode.com/posts/1";

function parseAstArgv(argv, cb = null) {
  if (argv.verbose) console.info(`Infering on :${argv.port} for file: ${argv.file}`);

  ast(argv.file, argv.port, function (arr) {
    //console.log(arr);
    //console.log("aléo")

    if (cb && typeof cb === "function")
      cb(arr);

  });
}
function parseAst(yargs) {

  mode = "AST";
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

function parseListArgv(argv, cb = null) {
  if (argv.verbose) console.info(`Listing`)
  listing(function (r, err) {
    if (err) {
      console.log("Some error occured");
      exit(1);
    }
    if (cb && typeof cb === "function")
      cb(r);

  }, argv.hostname);
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

function listingAsArray(cb = null, hostname = "ENV", port = 80) {
  listing(function (r) {
    if (r.error) exit(1);

    var o = "";
    count = 0;
    arr = [];
    for (const [key, value] of Object.entries(r.ports)) {
      //console.log(`${key}: ${value}`);
      if (key != "") {
        o += `${key}: ${value}\n`;
        arr[count] = value;
      }
      count++;
    }
    //console.log(arr);
    if (cb && typeof cb === "function")
      cb(arr);

  }, hostname, port);
}
function listing(cb = null, hostname = "ENV", port = 80) {
  //console.log("Listing available model. ");
  var callurl = url;
  if (hostname == "ENV") hostname = process.env.asthostname;
  callurl = "http://" + hostname + ":" + port + "/data/dkrunningcontainerports.txt";
  // console.log(hostname);
  // console.log(port);
  // console.log(callurl);

  dns.lookup(hostname, function (err, result) {
    //console.log(result);
    if (err) {
      console.log("BAD Host or unaccessible");
      exit(1);
    }
    else {

      urlexist(url, function (err, exists) {
        //console.log(exists); // true
        if (!exists || err) {
          console.log("BAD URL or unaccessible");
          exit(1);
        }
        try {

          http.get(callurl, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("error", err => {
              // console.log(err.message);
              var errO = new Object();
              errO.message = err.message;
              errO.name = err.name;
              errO.error = 1;

              if (cb && typeof cb === "function") cb(null, errO);
              return;
            });
            res.on("data", data => {
              body += data;
            });
            res.on("end", () => {
              // body = JSON.parse(body);
              list = "";
              prettyList = "";

              servers = new Object();
              ports = new Object();
              //console.debug(body);
              var arr = body.split(" ");
              arr.forEach(a => {
                var iarr = a.replace("\n", "").split(":");
                var p = iarr[0];
                var c = iarr[1];
                servers[c] = p;
                ports[p] = c;
                var l = `${p}\t ${c}`;
                list += a + " ";
                prettyList += l + "\n";

              });
              var r = new Object();
              //r.ports = ports;
              //r.servers = servers;
              r = { ports, servers, list, body };

              if (mode == "LIST") {
                console.log();
                if (argv.pretty)
                  console.info(prettyList);
                else console.info(list);

              }
              //else               console.log(list);

              if (cb && typeof cb === "function") cb(r);
            });
          });
        } catch (error) {
          // console.log(error.message)
          var errO = new Object();
          errO.message = error.message;
          errO.name = error.name;
          errO.error = 1;

          if (cb && typeof cb === "function") cb(null, errO);
        }

        // fetch(url)
        //   .then(res => res.text())
        //   .then(text => console.log(text));

        // console.log("done")

      });//URL Exist

    }
  });//DNS resolved
}