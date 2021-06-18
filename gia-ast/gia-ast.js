#!/bin/env node
'use strict';


const giaenc = require("gia-lib-encoding-base64");




const http = require('http');
const axios = require('axios').default;
var path = require('path');

const Buffer = require('safer-buffer').Buffer;
const fs = require('fs');
const tempfile = require('tempfile');
const sharp = require('sharp');


var args = process.argv.slice(2);


//----for later

// const yargs = require('yargs');
// var ver = yargs.version();

// var appStartMessage = 
// `Multi platform Contact Sheet maker
// By Guillaume Descoteaux-Isabelle, 2020-2021
// version ${ver}
// ----------------------------------------`;
// //const { argv } = require('process');
// //const { hideBin } = require('yargs/helpers')
// const argv = yargs(process.argv)

// .scriptName("gis-csm")
// .usage(appStartMessage)
//     // .command('serve [port]', 'start the server', (yargs) => {
//     //   yargs
//     //     .positional('f', {
//     //       describe: 'port to bind on',
//     //       type:'string',
//     //       default: 5000
//     //     })
//     // }, (argv) => {
//     //   if (argv.verbose) console.info(`start server on :${argv.port}`)
//     //   //serve(argv.port)
//     //   console.log("test");
//     //   console.info(`start server on :${argv.port}`)
//     // })
//     .option('file', {
//       alias: 'f',
//       type: 'string',
//       description: 'Specify the file out'
//     })
//     .option('directory', {
//       alias: 'd',
//       type: 'boolean',
//       default:false,
//       description: 'Name the output using current Basedirname'
//     }).usage(`gis-csm -d --label  # Assuming this file in directory: vm_s01-v01_768x___285k.jpg
//     # will extract 285 and add that instead of filename`)
//     .option('verbose', {
//       alias: 'v',
//       default:false,
//       type: 'boolean',
//       description: 'Run with verbose logging'
//     })
//     .option('label', {
//       alias: 'l',
//       type: 'boolean',
//       default:false,
//       description: 'Label using last digit in filename (used for parsing inference result that contain checkpoint number)'
//     })
//   .argv;


//-----------

var config = null;

const envListHelp = `
vi ~/.bash_env
export asthostname="orko.guillaumeisabelle.com"
export astoutsuffix="__stylized__"
export astportbase=90
export astcallprotocol="http"
export astcallmethod="stylize"
`;

try {
	
	var tst=require('dotenv').config()
	if (tst.parsed) 
	{
		config = new Object()
		var {asthostname,astoutsuffix,astportbase,astcallprotocol,astcallmethod}	= tst.parsed;

config.hostname = asthostname; config.outsuffix = astoutsuffix; config.portbase = astportbase;  config.callmethod = astcallmethod;config.callprotocol = astcallprotocol;
	config.src=".env";}


} catch (error) { }

try {	//@a Init if we did not had a .env
	if (config == null ) { 
		config = require('./config'); 
		config.src="config";
	}
 } catch (error) {
  // console.error("config.js NOT FOUND.  ");
  //console.log("Read from ENV VAR");
  try {
    config = new Object();
    var envErr = 0;

    //----grab-the-env

    if (process.env.asthostname)
    config.hostname = process.env.asthostname;
    else envErr++;
    if (process.env.astoutsuffix)
    config.outsuffix = process.env.astoutsuffix;
    else envErr++;
    if ( process.env.astportbase)
    config.portbase = process.env.astportbase;
    else envErr++;
    if (process.env.astcallprotocol)
    config.callprotocol = process.env.astcallprotocol;
    else envErr++;
    if (process.env.astcallmethod)    
    config.callmethod = process.env.astcallmethod;
    else envErr++;
	config.src="var";    
    if (envErr > 0) {
      console.log("Env require setup");
      console.log(envListHelp);
    }

    //----grab-the-env
    
  } catch (error) {
    console.error("Require config.js or env var to be set");
    console.log(envListHelp);
    process.exit(1);

  }
}
console.log(config);
process.exit();

if (args[0] == "--help" || args[0] == "-h" || args[0] == "-help" || args[0] == "--h" || !args[0] || !args[1]) {
    console.log(`
-------------------------------------
AST Web API Stylizer CLI Wrapper
by Guillaume D-Isabelle, 2021
Version 0.1.15
--------------------------------------
-------------HELP----------------------
Stylize an image using the Web API.

Synopsis:  
./gia-ast.js [IMAGE] [ModelID]

usage : 
./gia-ast.js mycontent.jpg 91
./gia-ast.js mycontent.jpg 01
./gia-ast.js mycontent.jpg 12

------------------------------
  `);
    if (!args[0] || !args[1]) console.log("MISSING ARGUMENTS");
}
else // Lets do the work
{

  var stylizedImage;
  var imgFile = args[0];
  var ext = path.extname(imgFile);
  var imgFileBasename = path.basename(imgFile);
  var imgFileNameOnly = imgFileBasename.replace(ext, "");

  
  var resizeSwitch = false;
  var targetResolutionX = 768;
  if (args[2]) {
    resizeSwitch = true;
    targetResolutionX = Number(args[2]);
  }

  //ModelID is related to a port will use
  var modelid = args[1];
  var targetOutput = imgFileNameOnly + config.outsuffix + modelid + ext;
  console.log("TargetOutput: " + targetOutput);
  var portnum = config.portbase + modelid;
  
  const callurl = config.callprotocol + "://" + config.hostname + ":" + portnum +"/" + config.callmethod.replace("/","");
  


  console.log("Processing: " + imgFile + " at port :" + portnum);

/*
//Use later to resized the image if switch used
sharp('input.jpg')
  .rotate()
  .resize(200)
  .jpeg({ mozjpeg: true })
  .toBuffer()
  .then( data => { ... })
  .catch( err => { ... });
  */
  doWeResize(imgFile,config,portnum,callurl,targetOutput,resizeSwitch,targetResolutionX);

  
}
 
function doWeResize(imgFile,config,portnum,callurl,targetOutput,resizeSwitch=false,targetResolutionX=512)
{

  if (resizeSwitch)
  {
    var tfile =  tempfile('.jpg');
    //console.log("Tempfile:" + tfile);
    
    sharp(imgFile)
    .resize(targetResolutionX)
    .toFile( tfile, (err, info) => { 
      if (err) console.error(err);
      //console.log(info);
      console.log("A resized contentImage should be available at that path :\n    feh " + tfile
      + "  \n     with resolution : " + targetResolutionX);
   // process.exit(1); 
    doTheWork(tfile,config,portnum,callurl,targetOutput);
   });
  } else  //no resize command
    doTheWork(imgFile,config,portnum,callurl,targetOutput);


}


function doTheWork(cFile,config,portnum,callurl,targetOutput)
{
  try {
    
    var data = giaenc.
    encFileToJSONStringifyBase64Prop(cFile,"contentImage");
    //console.log(data);
    //var unparsedData = JSON.parse(data);

    //---------------------

    const options = {
      hostname: config.hostname,
      port: portnum,
      path: config.callmethod,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    console.log("Calling : " + config.hostname + ":" + portnum);

    axios.post(callurl, data, options)
      .then(function (response) {
        // var d = JSON.parse(response);
        var { data } = response;
        var { stylizedImage } = data;


        //---import
        // decode_base64_to_file(stylizedImage, targetOutput);
        giaenc.dec64_StringToFile(stylizedImage,targetOutput);
        console.log("A stylizedImage should be available at that path :\n    feh " + targetOutput);
      

        //console.log(stylizedImage);
      })
      .catch(function (err) {
        console.log("There was error");
        console.log(err.message);
      });


    //-----------------------


  } catch (error) {
    console.log("something went wrong: ");
    console.log(error);
  }}
