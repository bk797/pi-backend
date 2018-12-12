import {Request,Response} from 'express';
// import Radar from '../types/radar';
import dp from '../data-processor/controller';
import {error} from '../helper/responses';

/**
	function that sends a text sample to IBM watson to get a personality profile
	Body params
	txt- text to be analyzed
	name- author of the text
	if either is not provided send an error
**/

const uploadTxt = (req:Request,res:Response) => {
	const err = error(res);
	const {txt,name}:{txt:string,name:string} = req.body;

	//undefined or empty text
	if(!txt || txt === ''){
		err('No input text provided.  Please provide text to analyse');
		return;
	}

	//less than minimum word count
	if(txt.split(/\s/g).length < 100){
		err('Input text does not have enough words.  Please have at least 100');
		return;
	}
	//should I check if text is too big?

	if(!name){
		err('Please provide a name');
		return;
	}

	dp({txt,name},'txt')
	.then((data:any) => res.json(data))
	.catch(()=>res.status(400).json('error grabbing profile'));
}

module.exports = uploadTxt;