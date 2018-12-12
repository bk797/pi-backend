import {Response} from 'express';
const {curry} = require('ramda');

/**
	shorthand for Response messages
**/

export const error = curry((res:Response,msg:string) => res.status(400).json(msg));
