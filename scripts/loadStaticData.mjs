import * as fs from "fs";
import path from "path";

const files = [
  "moves",
  "move_names",
  "pokemon_species",
  "pokemon_species_names",
];
const githubFilesUrl =
  "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/";
const STATIC_FILES_DIRECTORY = path
  .join(process.cwd(), "src/assets/data/")
  .replace(/\\/gm, "/");

function csvJSON(csv) {
  const lines = csv.split("\n");
  let result = [];
  const headers = lines[0].split(",");
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    const currentline = lines[i].split(",");
    for (let j = 0; j < headers.length; j++) {
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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${file}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("\x1b[32m%s\x1b[0m", `✔ ${file} succesfully loaded`);
        fs.writeFileSync(
          STATIC_FILES_DIRECTORY + file + ".json",
          JSON.stringify(csvJSON(data))
        );
      })
      .catch((error) => {
        console.log("\x1b[31m%s\x1b[0m", "Error:", error);
      });
  }
}

loadFiles();
