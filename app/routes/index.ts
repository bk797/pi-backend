import express, {Request, Response} from 'express';
const router = express.Router();

/**
	this file handles all of the different routing paths
	will return a 404 if the path is not found
**/

router.use('/upload',require('./upload'));

router.get('/sample',require('./sample'));

router.get('*',(req:Request,res:Response)=>res.status(404).json('URL not found'));

module.exports = router;