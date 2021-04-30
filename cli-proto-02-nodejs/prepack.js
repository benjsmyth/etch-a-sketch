
//
const fs = require('fs');
var json = fs.readFileSync("package.json");
var data = JSON.parse(json);
var mainScript = "gia-ast.js";
fs.copyFileSync(mainScript,mainScript+".prepublish");
var script = "---";
script = fs.readFileSync(mainScript);

fs.writeFileSync(mainScript,script.replace("VERSIONFLAG",data.version));

