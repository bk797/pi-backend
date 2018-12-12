import {Request,Response} from 'express';
const sampleData = require('./sample.data');

/**
	sends back sample personality insight radar data	
**/

const sample = (req:Request,res:Response) => {
	res.json(sampleData);
}

module.exports = sample;