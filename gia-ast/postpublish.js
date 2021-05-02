
//
const fs = require('fs');

var mainScript = "gia-ast.js";
try {
   var backScriptFile = mainScript+".prepublish"
   fs.copyFileSync(backScriptFile,mainScript);
   fs.rmSync(backScriptFile);
   console.log("Version file restored.");
   
} catch (error) {
   console.log("The restoration of the " + mainScript + " might not have worked.");
   console.log(error.message);
}





