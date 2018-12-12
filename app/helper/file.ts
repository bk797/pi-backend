import fs from 'fs';
import {compose} from 'ramda';

/**
	shorthand to read a file in a certain format
**/

const readFileSyncUTF:(path:string)=>string = (path) => fs.readFileSync(path,'utf-8');

const readFileSyncJSON:(path:string)=>any = compose(JSON.parse,readFileSyncUTF);

export {readFileSyncUTF,readFileSyncJSON};
