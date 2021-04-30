#!/bin/env node
'use strict';

const http = require('http');
const axios = require('axios').default;

var portbase = "90";
const hostname = 'orko.guillaumeisabelle.com';

const Buffer = require('safer-buffer').Buffer;
const path = require('path');
const fs = require('fs');


var args = process.argv.slice(2);


if (args[0] == "--help" || args[0] == "-h" || args[0] == "-help" || args[0] == "--h" || !args[0])
console.log(`
-------------------------------------
AST Web API Stylizer CLI Wropper
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

else // Lets do the work
{
  
  var stylizedImage;
  var imgFile = args[0];
  var modelid = args[1];
  var portnum = portbase + modelid;
  var resultSuffix = "__stylize__" + modelid;
  
  console.log("Processing: " + imgFile + " at port :" + portnum);

  //encode_base64_v2(imgFile, target);
  try {
    var data = encode_base64_v3_to_JSONRequestStringify(imgFile);
    
        
          
    //---------------------
    // const data = JSON.stringify({
    //   todo: 'Buy the milk'
    // })
    const options = {
      hostname: hostname,
      port: portnum,
      path: '/stylize',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    console.log("Calling : " + hostname);

axios
  .post(hostname,data)
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
   // console.log(res)
    //process.stdout.write(res);
  })
  .catch(error => {
    console.log("There were errors");
    console.error(error.message);
  })


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
      console.log("something went wrong: " );
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

