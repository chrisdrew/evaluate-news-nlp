
let	url = {
	link : ''
}

const postCityWeather = async(url='', data)=>{
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
		//let newText = newData.text.replace("\n", "<br><br>");
		var newText = newData.text.replace( new RegExp( "\n", "g" ),"<br>");
		console.log(newData);
		document.getElementById('results').innerHTML = newText;
        return newText
    }catch(error) {
        console.log(error);
        return
    }
}

const updateForm = async() =>{
	const res = await fetch(`http://localhost:8081/classify`);

    try{
        const data = await res.json();
        document.getElementById('results').innerHTML = data.text;
        return
    } catch (e){
        console.log(e);
        return
    }
}

const handleSubmit = async(event) =>{
	event.preventDefault()
	console.log('handleSubmit');
    // check what text was put into the form field
    let formText = document.getElementById('name').value

    // Client.checkForName(formText)
	// await updateForm();
	url.link = formText;
	console.log(url.link)
	await postCityWeather('http://localhost:8081/classifyP', url);
	console.log("::: Form Submitted :::");
	
	
}

export { handleSubmit }
