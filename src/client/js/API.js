const getLocalInfo = async()=>{
	console.log('getLocalInfo');
    const res = await fetch('http://localhost:8081/getWeather');
    try{
		const data = await res.json();
		console.log(data);
		
        return data
    } catch (e){
        console.log(e);
    }
}