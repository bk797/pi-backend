import express, {Request, Response,Router} from 'express';
import bb from 'express-busboy';
import bodyParser from 'body-parser';

const router = express.Router();
const FILEPATH = './uploads/'

/**
	handles requests to analyze data
	fb- fb messages
	txt- text samples
**/


//read http body
router.use(bodyParser.json());

//handle file uploads
//@ts-ignore
bb.extend(router,{
	upload:true,
	path: FILEPATH,
	allowedPath: /\/fb$/
});

router.post('/fb',require('./uploadFb'));

router.post('/txt',require('./uploadTxt'));

router.post('*',(req:Request,res:Response)=>res.status(404).json("invalid upload type"));

// export default router;
module.exports = router;

