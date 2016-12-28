const express = require('express'); //always leave express at the top
const request = require('request');
const app = express();
const port = 3000;
const parser = require('json-parser');
const mongoose = require('mongoose');
const Resort = require('./models/resort');

mongoose.connect('mongodb://localhost/on-the-snow-2'); //connects to db on-the-snow-2

let db = mongoose.connection;
var token = '?token=a5bae8eea465aae8f096ad0b775121a6702a31e6eb2686d8';
let handler;
db.once('open',function(){
	console.log('Connection to DB made!'); //tests if connection has been made to db
	handler = setInterval(() => {
		Resort.find({},function(err, documents) {
		for(let resort of documents) {
			request('http://clientservice.onthesnow.com/externalservice/resort/' + resort.id + '/forecast' + token + '&language=en&country=US', function(error, response, body) {
            	if (!error && response.statusCode == 200) {
             		var object = parser.parse(body);
                	Resort.update({id: resort.id},{resortTemp: object.tempTopMin},function(err){
                		if(err) {
                			console.log('Error: '+ err);
                		}
                		console.log('updated at '+ Date.now());
                	});
            	}
        	});
		}
		});
	},1 * 60 * 60 * 1000); //makes request once a day

});
db.on('error', function(err){
	console.log(err);
	clearInterval(handler);
});

// getting the list of all resorts with ids
// request('http://clientservice.onthesnow.com/externalservice/region/countries/list' + token + '&language=en&country=US', function(error, response, body) {
//     if (!error && response.statusCode == 200) {

//         var object = parser.parse(body);
//         // console.log(object);
//     };
// })

// getting the list of resorts in colorado with ids



// //getting info on 1 resort
// function searchedResort(integer) {
//     let resortNum = [242,12];

//     for (let value of resortNum) {
//         request('http://clientservice.onthesnow.com/externalservice/resort/' + value + '/profile' + token + '&language=en&country=US', function(error, response, body) {
//             if (!error && response.statusCode == 200) {
//             	var object = parser.parse(body);
//                 console.log(object);
//             };
//         })

//     };
// };

//searchedResort();
