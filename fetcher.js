//take two CL arguments
    //URL
    // local file path such as ./index.html
//GET the resource from URL, then download to local path on machine
//upon completion print out `Downloaded and saved x bytes to ${localPath}

const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputArray = process.argv.slice(2);
let localPath = inputArray[1];
const url = inputArray[0]


request(url, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
  }
  fs.writeFile(localPath, body, { flag: "wx" }, err => {
    //stretch work to factor error to overwrite prompt or not. incomplete, will come back
    if (err) {
      rl.question(`File ${localPath} already exists. Would you like to overwrite? Press Y to overwrite?   `, (key) => {
        if (key === 'y') {
          rl.close()
          return;
        } 
        setTimeout(() => {
          rl.close();
          return
        }, 5000);
      });
      return
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
  })
});


