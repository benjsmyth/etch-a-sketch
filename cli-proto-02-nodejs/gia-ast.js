#!/bin/env node
'use strict';


const giaenc = require("gia-lib-encoding-base64");




const http = require('http');
const axios = require('axios').default;
var path = require('path');

const Buffer = require('safer-buffer').Buffer;
const fs = require('fs');


var args = process.argv.slice(2);


var config = null;

try {
  config = require('./config');
  
} catch (error) {
  // console.error("config.js NOT FOUND.  ");
  console.log("Read from ENV VAR");
  try {
    config = new Object();
    config.hostname = process.env.asthostname;
    config.outsuffix = process.env.astoutsuffix;
    config.portbase = process.env.astportbase;
    config.callprotocol = process.env.astcallprotocol;
    config.callmethod = process.env.astcallmethod;
    
  } catch (error) {
    console.error("Require config.js or env var to be set");
    console.log(`
    export asthostname="orko.guillaumeisabelle.com"
    export astoutsuffix="__stylized__"
    astportbase=90
    astcallprotocol="http"
    astcallmethod="/stylize"
    `);
    process.exit(1);

  }
}

if (args[0] == "--help" || args[0] == "-h" || args[0] == "-help" || args[0] == "--h" || !args[0] || !args[1]) {
    console.log(`
-------------------------------------
AST Web API Stylizer CLI Wrapper
by Guillaume D-Isabelle, 2021
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

  //ModelID is related to a port will use
  var modelid = args[1];
  var targetOutput = imgFileNameOnly + config.outsuffix + modelid + ext;
  console.log("TargetOutput: " + targetOutput);
  var portnum = config.portbase + modelid;
  const callurl = config.callprotocol + "://" + config.hostname + ":" + portnum + config.callmethod;


  console.log("Processing: " + imgFile + " at port :" + portnum);

  try {
    
    var data = giaenc.
    encFileToJSONStringifyBase64Prop(imgFile,"contentImage");
    console.log(data);
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

    console.log("Calling : " + config.hostname);

    axios.post(callurl, data, options)
      .then(function (response) {
        // var d = JSON.parse(response);
        var { data } = response;
        var { stylizedImage } = data;


        //---import
        // decode_base64_to_file(stylizedImage, targetOutput);
        giaenc.dec64_StringToFile(stylizedImage,targetOutput);

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
  }


}




