
let	url = {
	link : ''
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

const handleSubmit = async(e) =>{
	e.preventDefault()
	console.log('handleSubmit');
    let formText = document.getElementById('name').value
	url.link = formText;
	console.log(url.link)
	callAPI()
	.catch(e => {
		return e
	})
	
}

const callAPI = async()=>{
	await Client.validURL(url.link);
	await Client.classify('http://localhost:8081/aylien', url);
	await Client.printUserInput();
	throw new Error("something went wrong!");
}



export { handleSubmit }
