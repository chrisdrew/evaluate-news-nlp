
let	url = encodeURIComponent('https://www.bbc.com/news/world-us-canada-52602580');

const updateForm = async() =>{
	const res = await fetch('http://localhost:8081/classify');

    try{
        const data = await res.json();
        console.log(data);
        document.getElementById('results').innerHTML = data.text
        return
    } catch (e){
        console.log(e);
        return
    }
	fetch(`http://localhost:8081/classify`)
    .then(res => {
		console.log(res);
        return res.json()
    })
    .then(function(data) {
		console.log(data);
        document.getElementById('results').innerHTML = data.text
    })
}

const handleSubmit = async(event) =>{
	event.preventDefault()
	console.log('handleSubmit');
    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)
	await updateForm();
	console.log("::: Form Submitted :::");
	
	
}

export { handleSubmit }
