const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;

//define up express and middleware
const app = express();
app.use(cors());

app.use('/',require('./routes/index'));

//catch all route
app.use('*',(req,res) => res.status(404).json("Url not found"));

//run server
app.listen(PORT,()=>{
	console.log(`listening on ${PORT}`);
});
