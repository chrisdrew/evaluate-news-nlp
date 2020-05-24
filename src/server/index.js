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
let sentimentObj;
let taxonomyObj;

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

const sentimentAPI = async (url) => {
	textapi.sentiment({
		'url': url,
		mode: 'Document'
	  }, 
	  function(error, response) {
		if (error === null) {
			sentimentObj = response;
			console.log('sentimentObj');
			return sentimentObj
		}else{
			console.log(error)
		}
	});
} 

const classifyTaxAPI = async (url) => {
	textapi.classify({
		'taxonomy': 'iab-qag',
		'url': url
	  }, 
	  function(error, response) {
		if (error === null) {
			taxonomyObj = response;
			console.log('taxonomyObj');
			return taxonomyObj
		}else{
			console.log(error)
		}
	});
} 

const mergeObject = async()=>{
	try {	
		getResponse= Object.assign(sentimentObj,taxonomyObj);
		console.log(getResponse);
		return getResponse
	} catch (error) {
		console.log(error)
	}
}

app.post('/aylien', async (req, res) => {
	await sentimentAPI( req.body.link );
	// await classifyTaxAPI( req.body.link );
	// await mergeObject();
	res.send(sentimentObj);
    res.send();
});


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
