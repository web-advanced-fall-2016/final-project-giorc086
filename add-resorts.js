const express = require('express'); //always leave express at the top
const request = require('request');
const app = express();
const port = 3000;
const parser = require('json-parser');
const mongoose = require('mongoose');
const Resort = require('./models/resort');

mongoose.connect('mongodb://localhost/on-the-snow-2'); //name of db mongoose is connecting to

let db = mongoose.connection;
var token = '?token=a5bae8eea465aae8f096ad0b775121a6702a31e6eb2686d8';

db.once('open',function(){
	console.log('Connection to DB made!'); //tests if connection has been made to db
	request('http://clientservice.onthesnow.com/externalservice/region/251/list' + token + '&language=en&country=US', function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        var object = parser.parse(body);
	        for(let resort of object.resorts) {
	        	let newResort = new Resort({
	        		id: resort.id,
	        		resortName: resort.resortName,
	        		resortTemp: 0
	        	});
	        	Resort.find({id:resort.id}, function(err,documents) {

	        		if(documents.length === 0) { //saves to db
	        			newResort.save(function(err) {
			        		if(err) {
			        			console.log('Error: '+ err);
			        		}else {
			        			console.log('saved');
			        		}
			        	});
	        		}
	        	});

	        }
	    }
	});
});
db.on('error', function(err){
	console.log(err);
})

setTimeout(function(){
	Resort.find({}, function(err, documents) {
    	console.log(documents.length);
			console.log(documents); //logs to console the content of the db
    });
},4000); //delay of 4sec to allow async func to run w/out err
