import * as fs from "fs";
import path from "path";

const files = ["move_names", "pokemon_species"];
const githubFilesUrl =
  "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/";
const STATIC_FILES_DIRECTORY = path
  .join(process.cwd(), "src/assets/data/")
  .replace(/\\/gm, "/");

function csvJSON(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}

function loadFiles() {
  for (const file of files) {
    fetch(githubFilesUrl + file + ".csv", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(`File: ${file} loaded..`);
        fs.writeFileSync(
          STATIC_FILES_DIRECTORY + file + ".json",
          JSON.stringify(csvJSON(data))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

loadFiles();
