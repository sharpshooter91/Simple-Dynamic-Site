const fs= require("fs");

//Function that handles the reading of files and merge in value
function view (templateName, value, response) {
  //read from a templates files
  fs.readFile('./views/'+ templateName + "html", (error, fileContents) => {
    if (error) throw error;

  //Insert values in to the content

  //Write out to the response
    response.write(fileContents);
});
}

module.exports.view= view;
