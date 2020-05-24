
let	url = {
	link : ''
}

const handleSubmit = async(e) =>{
	try {
		e.preventDefault();
		let formText = document.getElementById('name').value;
		console.log(`formText `)
		console.log(`formText is '${formText}'`)
		url.link = formText;
		callAPI();
	} catch (error) {
		return error
	}	
}

const handleSubmitTest = async(link) =>{
	try {
		e.preventDefault();
		let formText = document.getElementById('name').value;
		console.log(`formText `)
		console.log(`formText is '${formText}'`)
		url.link = formText;
		callAPI();
	} catch (error) {
		return e
	}
}

const callAPI = async()=>{
	await Client.validURL(url.link);
	await Client.classify('http://localhost:8081/aylien', url);
	await Client.printUserInput();
	throw new Error("something went wrong!");
}

export { handleSubmit, handleSubmitTest }

