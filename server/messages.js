// const messages = {
//   'message': {
//     user: 'david',
//     message: 'hello',
//   }
// };


const messages = [
  {
    username: "human1",
    text: "words1",
    roomname: 'room1' || 'lobby'
  },
  {
    username: "human2",
    text: "words2",
    roomname: 'room2' || 'lobby'
  },
  {
    username: "human3",
    text: "words3",
    roomname: 'room3' || 'lobby'
  },

];
module.exports = messages;

//EXAMPLE
// var message = {
//   username: App.username,
//   text: FormView.$form.find('#message').val(),
//   roomname: Rooms.selected || 'lobby'
// };


// let cities = {
//   '10016': { zipcode: "10016",
//   state_abbr: "NY",
//   latitude: 40.746180,
//   longitude: 3.97759,
//   city: "New York",
//   state: "New York" }
// }

// cities.prototype.zip_lookup = function(zip) {
//   if (cities[zip]) {
//     return citiez[zip];
//   }
// }


// const cities = require(’cities’);
// const url = require(’url’);
// const http = require(’http’);
// const app = http.createServer((request, response) => {

//   var city;
//   var query;
//   query = url.parse(request.url, true).query;

//   if (query.zipCode) {
//     city = cities.zip_lookup(query.zipCode).city;
//   } else {
//     city = "not found"
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write(`<h1>The city you are in is ${city}.</h1>`);
//   }

//   response.end();
// });

// app.listen(3000);