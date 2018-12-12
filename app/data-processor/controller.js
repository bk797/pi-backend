// const fb = require('./preprocess/fb');
// const toRadar = require('./output/personality/personality');
// const pi = require('./api/pi');
import fb from './preprocess/fb';
import toRadar from './output/personality/personality';
import pi from './api/pi';

import {curry} from 'ramda';
// const {curry} = require('ramda');

const TYPE = {FACEBOOK:'fb',TEXT:'txt'};
Object.freeze(TYPE);


const toProfile = curry((name,profile) => Object.assign({name},profile));

//handle fb msg json file
const processFb = input => {
	const {file,names} = input;

	//get contentItems from file
	const contentItems = fb.contentItems(file);
	//create promise for each person in fb conversation
	const promises = [];
	for(const name of names){
		const promise = pi.personalityInsight(contentItems[name],'json')
		.then(toProfile(name))
		.catch(console.log);
		promises.push(promise);

	}
	//run promises then turn into radar data
	return Promise.all(promises).then(p=>toRadar(p));
}

//handle text input
const processTxt = input => {
	const {txt,name} = input;
	return pi.personalityInsight(txt,'txt')
	.then(toProfile(name))
	.then(p => toRadar([p]))
	.catch(console.log);
}

const insights = (input,type) => {
	switch(type){
		case TYPE.FACEBOOK:
			return processFb(input);
		case TYPE.TEXT:
			return processTxt(input);
		default:
			throw "invalid type"
	}
}

export default insights;