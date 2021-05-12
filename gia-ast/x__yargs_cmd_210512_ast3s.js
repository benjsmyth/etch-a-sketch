#!/usr/bin/env node

//@STCGoal A command with two positional args
var cnf = new Object();
var _cnfLoaded = false;

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

  .command('list [dihostname]', 'List available model from the hub',
    (yargs) => listSetupCLI(yargs), (argv) => listArgsParsing(argv))
  .command('ls [dihostname]', 'List available model from the hub',
    (yargs) => listSetupCLI(yargs), (argv) => listArgsParsing(argv))
    
  .option('pretty', {
    default: false,
    type: 'boolean',
    description: 'Changes the output'
  })

  .command('stylize [file] [astport]', 'Stylize a file using the selected AST Port', (yargs) => stylizeSetupCLI(yargs), (argv) => stylizeArgsParsing(argv)).alias("ast",'stylize')
  .example("$0 ast sample.jpg 98", "# Stylize using model id 98")

  .command('ast [file] [astport]', '# Stylize using model id 98 ', (yargs) => stylizeSetupCLI(yargs), (argv) => stylizeArgsParsing(argv))


  .option('asthostname', {
    alias: 'ah',
    type: 'string',
    default: '#ENV',
    description: 'HostNamed the main model server'
  })

  .option('verbose', {
    alias: 'v',
    default: false,
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .option('showargs', {
    alias: 'sa',
    default: false,
    type: 'boolean',
    description: 'dev - Show the arguments'
  })
  .option('showcnf', {
    alias: 'showconf',
    default: false,
    type: 'boolean',
    description: 'dev - Show the conf'
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

function ast(cnf, cb = null) {
  var {file, astport} = cnf.options;
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

    console.log("Stylizing using port : " + astport + " for file: " + file);
    
  }

}

/** Preprocess before parsing Command Arguments
 * 
 * @param {*} argv 
 */
function preProcessCommandArgs(argv) {

  if (!_cnfLoaded) loadcnf(cnf);

  // if (argv.pretty) {cnf.pretty=true;console.log("Pretty switch on");}
  //  if (argv.verbose) {cnf.verbose=true;console.info(`Infering on :${argv.port} for file: ${argv.file}`);}
  // if (argv.label) {cnf.label=true;console.log("Label switch on");}
  // if (argv.showargs) {cnf.showargs=true;console.log(argv);}

  var { pretty, verbose, label, directory, showargs, file, astport, asthostname, dihostname, callmethod,showcnf } = argv;

  if (asthostname == "#ENV") {
    try {
      if (process.env.asthostname) asthostname = process.env.asthostname;
    } catch (error) { }
  }
  if (dihostname == "#ENV") {
    try {
      if (process.env.dihostname) dihostname = process.env.dihostname;
    } catch (error) { }
  }

  cnf.options = { pretty, verbose, label, directory, showargs, file, astport, asthostname, dihostname, callmethod };

 if (showcnf) console.log(cnf);


}

function loadcnf(cnf) {

  try {
    if (fs.existsSync(__dirname + '/cnf.js'))
      cnf = require(__dirname + '/cnf.js');
    else if (fs.existsSync(process.env.HOME + '/astcnf.js'))
      cnf = require(process.env.HOME + '/astcnf.js');
    else {
      _cnfLoaded = loadCNFFromEnv(cnf) < 1 ? true : false;
    }

  } catch (error) {
    // console.error("cnf.js NOT FOUND.  ");
    //console.log("Read from ENV VAR");
    try {
      if (cnf == null) cnf = new Object();

      _cnfLoaded = loadCNFFromEnv(cnf) < 1 ? true : false;
      //----grab-the-env

    } catch (error) {
      console.error("Require astcnf.js in $HOME or cnf.js in " + __dirname + " or env var to be set. \n see bellow:");
      console.log(envListHelp);
      process.exit(1);

    }
  }
}
function loadCNFFromEnv(cnf) {
  var envErr = 0;

  //----grab-the-env

  if (process.env.asthostname)
    cnf.asthostname = process.env.asthostname;
  else envErr++;
  if (process.env.astoutsuffix)
    cnf.outsuffix = process.env.astoutsuffix;
  else envErr++;
  if (process.env.astportbase)
    cnf.portbase = process.env.astportbase;
  else envErr++;
  if (process.env.astcallprotocol)
    cnf.callprotocol = process.env.astcallprotocol;
  else envErr++;
  if (process.env.astcallmethod)
    cnf.callmethod = process.env.astcallmethod;
  else envErr++;

  if (envErr > 0) {
    console.log("Env require setup");
    console.log(envListHelp);
    _cnfLoaded = false;
  }
  else _cnfLoaded = true;
  return envErr;
}

/** Parse Stylize CMD Args
 * 
 * @param {*} argv 
 * @param {*} cb 
 */
function stylizeArgsParsing(argv, cb = null) {

  preProcessCommandArgs(argv);


  ast(cnf, function (arr) {
    //console.log(arr);
    //console.log("aléo")

    if (cb && typeof cb === "function")
      cb(arr);

  });
}

/** Stylize Setup CLI yargs
 * 
 * @param {*} yargs 
 * @returns 
 */
function stylizeSetupCLI(yargs) {


  mode = "AST";
  // .alias('ast [file] [port]')
  return yargs.positional('file', {
    describe: 'file to stylize.',
    type: 'string',
    default: '.'
  })
    .example('$0 s sample.jpg 98', 'Would stylize sample.jpg using astport 98.')
    .example('$0 s .jpg 98', 'Would stylize all jpgs.')
    .positional('astport', {
      describe: 'ast of the model port',
      default: 52
    })
    .option('callmethod', {
      alias: 'cm',
      type: 'string',
      default: '/stylize',
      description: 'Stylization method on the server'
    })
    .option('save_dir', {
      alias: 'o',
      type: 'string',
      default: "_aststylized",
      description: 'Name the output '
    })
    .option('file_suffix', {
      alias: 'o',
      type: 'string',
      default: "_stylized",
      description: 'specify file suffix '
    })

    .option('image_size', {
      alias: 'image_size',
      type: 'Number',
      default: 768,
      description: `For training phase: will crop out images of this particular size.
     For inference phase: each input image will have the smallest side of this size. 
     For inference recommended size is 1280.`
    })

    .option('ckpt_nmbr',
      {
        alias: 'chk',
        type: 'Number',
        default: '300',
        description: `CheckpoNumber number we want to use for inference.  Might be null(unspecified), then the latest available will be used.`
      })

    .option('model_name', {
      alias: 'model_name',
      default: 'model1',
      description: `Name of the model.  
      //@STCGoal Might use this to call the service for a model that might not be hydrated on a port.  It would take care of giving us inference from the model we specified.`
    })
    .example('$0 s.jpg --model_name "model_gia-ds-daliwill-210123-v01_new"',' Load latest chkpoint or otherwise spec --ckpt_nmbr 105')
    .example('$0 s.jpg --ckpt_nmbr 105 --model_name "model_gia-ds-daliwill-210123-v01_new"',' Load spec chkpoint ')
    .deprecateOption('ast')
    .option('s')






    ;
}
/** Parse the list CMD args
 * 
 * @param {*} argv 
 * @param {*} cb 
 */
function listArgsParsing(argv, cb = null) {
  preProcessCommandArgs(argv);

  listing(function (r, err) {
    if (err) {
      console.log("Some error occured");
      exit(1);
    }
    if (cb && typeof cb === "function")
      cb(r);

  }, argv.dihostname);
}

/** Setup List Command for the CLI
 * 
 * @param {*} yargs 
 * @returns 
 */
function listSetupCLI(yargs) {
  mode = "LIST";
  // .alias('ast [file] [port]')
  return yargs.positional('dihostname', {
    describe: 'dihostname',
    type: 'string',
    default: '#ENV'
  })
    .positional('diport', {
      describe: 'diport to look for getting data we would use',
      default: 80
    })

    .example("$0 list as.jgwill.com", "#List the models being served at that host")
    ;
}

function listingAsArray(cb = null, dihostname = "ENV", port = 80) {
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

  }, dihostname, port);
}
function listing(cb = null, dihostname = "ENV", port = 80) {
  //console.log("Listing available model. ");
  var callurl = url;
  try {

    if (dihostname == "ENV") dihostname = process.env.dihostname;
    else dihostname = process.env.asthostname;
  } catch (error) { }

  callurl = "http://" + dihostname + ":" + port + "/data/dkrunningcontainerports.txt";

  // console.log(dihostname);
  // console.log(port);
  // console.log(callurl);

  dns.lookup(dihostname, function (err, result) {
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