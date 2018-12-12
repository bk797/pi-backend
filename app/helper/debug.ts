/**
	any functions that help with debugging of code
**/
const print:(value:any)=>any = value => {
	console.log(value);
	return value;
}

export {print};