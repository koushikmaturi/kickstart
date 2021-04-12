const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Add path to the build folder
const buildPath = path.resolve(__dirname, 'build');
// Delete the build folder
fs.removeSync(buildPath);
// Add path to the Campaign contracts
const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');
//Convert the source code into something readable for javascript
const source = fs.readFileSync(campaignPath,'utf8');
//Compile the source code
var input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

//console.log(output);
if (output.errors) {
  output.errors.forEach(err => {
    console.log(err.formattedMessage);
  });
} else {
  const contracts = output.contracts["Campaign.sol"];
  //Create a new build folder for the new compiled ABI and bytecode
  fs.ensureDirSync(buildPath);
  for (let contractName in contracts) {
    const contract = contracts[contractName];
    fs.writeFileSync(
      path.resolve(buildPath, contractName + '.json'),
      JSON.stringify(contract, null, 2),
      "utf8"
    );
    //console.log(contract);
    console.log(contractName);
  }
}
