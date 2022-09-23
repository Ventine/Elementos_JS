const jsonForm = document.querySelector('#jsonform');
const csvnForm = document.querySelector('#csvform');
const bConvert = document.querySelector('#bConvert');

bConvert.addEventListener('click', e => {
	convertJSONtoCSV();
});

function convertJSONtoCSV(){
	let json;
	let keys = [];
	let values = [];

	try{
		json = JSON.parse(jsonForm.value);
	}catch(error){
		console.log("error");
		alert("Error de formato");
	}

	if (Array.isArray(json)) {
		json.forEach(item => {
		const nkeys = Object.keys(item);
			if (keys.length === 0) {
				keys = [...nkeys];
			}else{
				if(nkeys.length != keys.length){
					throw new error('Number of keys are diffrent.');
				}else{
					console.log("fine", nkeys);
				}
			}
		const row = keys.map(k => {
			return item[k];
		});
		values.push([...row]);
		});
		console.log(keys, values);
		values.unshift(keys);
		const text = values.map((v) => v.join(',')).join('\n');
		csvnForm.value = text;
	}else{
		alert("No es un arreglo");
	}
}
