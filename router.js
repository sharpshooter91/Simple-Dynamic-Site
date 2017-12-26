var Profile = require("./profile.js");
var renderer= require("./renderer.js")




//Handle HTTP route GET / and POST / i.e. Home
function home (request, response) {

  //if url == "/" && GET
    //show search

  //if url == "/" && POST
  if (request.url === "/") {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    renderer.view("header", {}, response);
    response.write('Search\n');
    response.end('Footer\n');
  }
    //redirect to /:username
  };
//Handle HTTP route GET /:username i.e. /chalkers
function user (request, response){
  //if url == "/...."
  let username= request.url.replace("/", "");
  if (username.length> 0) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Header\n");
    //get json from treehouse
    var studentProfile = new Profile(username);
      //on "end"
      studentProfile.on("end", function (profileJson){
        //show profile
        //store the values which we need
        let values = {
          avatarUrl: profileJson.gravatar_url,
          username: profileJson.profile_name,
          badgecount: profileJson.badges.length,
          javascriptPoints: profileJson.points.JavaScript
        }
        //Simple response
        response.write(values.username+ " has "+ values.badgecount+ " badges" + "\n");
        response.end('Footer\n');
      });

    //on "error"
    studentProfile.on("error", function(error){
      //show error
      response.write(error.message + "\n");
      response.end('Footer\n');
    });



  }
}

module.exports.home= home;
module.exports.user= user;
