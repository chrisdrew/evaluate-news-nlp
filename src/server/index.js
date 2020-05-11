const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
var aylien = require("aylien_textapi")

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

let getResponse;

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

// set aylien API credentias
var textapi = new aylien({
	application_id: process.env.API_ID,
	application_key: process.env.API_KEY
});
const classifyAPI = async (url) => {
	console.log('url is');
	console.log(url);
	textapi.classify({
		'url': url
	  }, 
	  function(error, response) {
		if (error === null) {
			getResponse = response;
			return getResponse
		}else{
			console.log(error)
		}
	});
} 


// app.get('/classify', function (req, res){

// 	var searchParams = new URLSearchParams(req.originalUrl);
// 	console.log( searchParams );
// 	classifyAPI( searchParams.get('link') );
//     res.send(getResponse);
// });

app.get('/classify', async (req, res) => {	
	//var searchParams = new URLSearchParams(req.originalUrl);
	//console.log( searchParams );
//searchParams.get('link')
	await classifyAPI( 'https://www.bbc.com/news/world-us-canada-52602580' );
	res.send(getResponse);
	return
  })


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
