let userViewedContet;

const validURL = async(url)=>{
	console.log(`API url is ${url}`);
	let newURL = url;
	try {
		newURL = new URL(url);
		console.log(`newURL is valid ${newURL}`);
		return newURL
	} catch (e) {
		if (url === '') {
			console.log('please enter a URL');
			errorHandle('You must enter a URL first', 'yellow');
			throw e
		} else {	
			console.log('Invalid URL');
			errorHandle('Sorry that is not a correct URL', 'red');
			throw e
		}
	}
}


const classify = async(url='', data)=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
    });
    try {
		const newData = await response.json();
		userViewedContet = newData;
		console.log('userViewedContet');
		console.log(userViewedContet);
		var newText = newData.text.replace( new RegExp( "\n", "g" ),"<br>");
		console.log(newData);
		document.getElementById('results').innerHTML = newText;
        return newText
    }catch(error) {
		console.log(response);
        return
    }
}

const printUserInput = async() =>{
	// console.log(userViewedContet);
	document.getElementById('polarity').innerHTML = userViewedContet.polarity;
	document.getElementById('polarity_confidence').innerHTML = userViewedContet.polarity_confidence;
	document.getElementById('subjectivity').innerHTML = userViewedContet.subjectivity;
	document.getElementById('subjectivity_confidence').innerHTML = userViewedContet.subjectivity_confidence;
	document.getElementById('code').innerHTML = userViewedContet.categories[0].code;
	document.getElementById('label').innerHTML = userViewedContet.categories[0].label;
}

const errorHandle = function(message, warning){
	const label = document.getElementById('warning');
	switch(warning){
		case 'red' :
			label.classList.remove('warning-yellow');
			label.classList.add('warning-red');
			label.innerHTML = message;
		break
		case 'yellow':
			label.classList.remove('warning-red');
			label.classList.add('warning-yellow');
			label.innerHTML = message;
		break
	}
}


export{ validURL }
export{ classify }
export{ printUserInput }
