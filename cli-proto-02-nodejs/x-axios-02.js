#!/bin/env node
'use strict';

const config = require('./config');





const http = require('http');
const axios = require('axios').default;
var path = require('path');

const Buffer = require('safer-buffer').Buffer;
const fs = require('fs');


var args = process.argv.slice(2);


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
  var modelid = args[1];
  var targetOutput = imgFileNameOnly + config.outsuffix + modelid + ext;
  console.log("TargetOutput: " + targetOutput);
  var portnum = config.portbase + modelid;
  const callurl = config.callprotocol + "://" + config.hostname + ":" + portnum + config.callmethod;

  var resultSuffix = config.outsuffix + modelid;

  console.log("Processing: " + imgFile + " at port :" + portnum);

  //encode_base64_v2(imgFile, target);
  try {
    var data = encode_base64_v3_to_JSONRequestStringify(imgFile);

    //var unparsedData = JSON.parse(data);

    //---------------------
    // const data = JSON.stringify({
    //   todo: 'Buy the milk'
    // })
    const options = {
      hostname: config.hostname,
      port: portnum,
      path: '/stylize',
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

        decode_base64_to_file(stylizedImage, targetOutput);

        //console.log(stylizedImage);
      })
      .catch(function (err) {
        console.log("There was error");
        console.log(err.message);
      });



    // axios
    //   .post(config.hostname,data)
    //   .then(res => {
    //     console.log(`statusCode: ${res.statusCode}`)
    //    // console.log(res)
    //     //process.stdout.write(res);
    //   })
    //   .catch(error => {
    //     console.log("There were errors");
    //     console.error(error.message);
    //   })


    // const req = http.request(options, res => {
    //   console.log(`statusCode: ${res.statusCode}`)

    //   res.on('data', d => {       
    //     //process.stdout.write(d);
    //   });

    //   res.on('end',d =>
    //   {
    //    // console.log(res);
    //     // var jsonDataResult = JSON.parse(d);
    //     // jsonDataResult.stylizedImage = "---";
    //     // process.stdout.write(jsonDataResult);
    //   });

    // }); 

    // req.on('error', error => {
    //   console.error(error)
    // })

    // req.write(data)
    // req.end()


    //-----------------------


  } catch (error) {
    console.log("something went wrong: ");
    console.log(error);
  }


}







/**
 * Encode an image file into base64 JSON request file 
 * @param  {string} filename
 * @param  {string} targetJsonFile
 */
function encode_base64_v3_to_JSONRequestStringify(filename) {
  var base64Raw = fs.readFileSync(filename, 'base64');

  var base64 = base64Raw;
  var ext = path.extname(filename).replace(".", "");
  if (ext == "jpg" || ext == "JPG" || ext == "JPEG") ext = "jpeg";
  if (ext == "pneg" || ext == "PNG" || ext == "Png") ext = "png";


  if (base64Raw.indexOf("data:") == -1) //fixing the string
    base64 = `data:image/${ext};base64,`
      + base64Raw;

  //console.log(base64);
  var jsonRequest = new Object();
  jsonRequest.contentImage = base64;
  var jsonData = JSON.stringify(jsonRequest);

  return jsonData;
  //  fs.writeFileSync(targetJsonFile, jsonData);
  //console.log("Should have saved :" + targetJsonFile);

}


//---------------Import from gia-ast-img2stylize-request...
/**
* Encode an image file into base64 JSON request file 
* @param  {string} filename
* @param  {string} targetJsonFile
*/
function encode_base64_v3_to_JSONRequestFile(filename, targetJsonFile) {
  var base64Raw = fs.readFileSync(filename, 'base64');

  var base64 = base64Raw;
  var ext = path.extname(filename).replace(".", "");
  if (ext == "jpg" || ext == "JPG" || ext == "JPEG") ext = "jpeg";
  if (ext == "pneg" || ext == "PNG" || ext == "Png") ext = "png";


  if (base64Raw.indexOf("data:") == -1) //fixing the string
    base64 = `data:image/${ext};base64,`
      + base64Raw;

  //console.log(base64);
  var jsonRequest = new Object();
  jsonRequest.contentImage = base64;
  var jsonData = JSON.stringify(jsonRequest);

  fs.writeFileSync(targetJsonFile, jsonData);
  //console.log("Should have saved :" + targetJsonFile);

}
/**
* @param  {string} filename
* @param  {string} targetJsonFile
*/
function encode_base64_v2(filename, targetJsonFile) {
  fs.readFile(filename, function (error, data) {
    if (error) {
      throw error;
    } else {
      let buf = Buffer.from(data);
      let base64 = buf.toString('base64');

      var jsonRequest = new Object();
      jsonRequest.stylizedImage = base64;
      var jsonData = JSON.stringify(jsonRequest);

      // console.log('Base64 ' + filename + ': ' + base64);
      fs.writeFileSync(targetJsonFile, jsonData);
      console.log("Should have saved :" + targetJsonFile);

      return base64;
    }
  });
}

/**
* @param  {string} base64str
* @param  {string} filename
*/
function decode_base64(base64str, filename) {
  let buf = Buffer.from(base64str, 'base64');

  fs.writeFileSync(filename, buf);

}



//---import from gia-ast-util-responseStylize-to-file


/**
 * @param  {string} base64str
 * @param  {string} filename
 */
function decode_base64_to_file(base64str, filename) {

  if (base64str.indexOf("png;base64") > -1)
    base64str = base64str
      .replace(/^data:image\/png;base64,/, "");

  if (base64str.indexOf("jpeg;base64") > -1) {
    base64str = base64str
      .replace(/^data:image\/jpeg;base64,/, "");
  }
  let buf = Buffer.from(base64str, 'base64');

  fs.writeFileSync(filename, buf);

}