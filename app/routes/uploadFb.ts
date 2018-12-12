import {Request, Response} from 'express';

// import Radar from '../types/radar';

import dp from '../data-processor/controller';
import {error} from '../helper/responses';

interface FileRequest extends Request {
	files:any;
	body:any;
}

/**
	Transforms JSON into ContentItems for each person and a profile for each person.
	Req params
	file- file containing the fb JSON messages
	names- names of the people to analyze
**/

const uploadFb = (req:FileRequest,res:Response) => {
	const err = error(res);
	const {file} = req.files;
	let {names} = req.body;

	//no file provided
	if(!file){
		err('No file provided.  Make sure that the file is in the {file:data} k-v pair');
		return;
	}

	//more than one file provided
	if(Array.isArray(file)){
		err('Multiple files found.  Please only upload one file at a time');
		return;
	}

	//see if there are names
	if(!names){
		err('No names provided.  Please provide who you want analyzed');
		return;
	}

	names = names.split(',');
	dp({file:file.file,names},'fb')
	.then((data:any) => res.json(data))
	.catch(err);
}

// export default uploadFb;
module.exports = uploadFb