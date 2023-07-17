const mongoose= require('mongoose')
var http = require('http')
const express= require('express')
// const bodyParser= require('body-parser')
const routes = require('./routes/routes');

// const cors = require('cors');
const app= express()
const port='3023'

app.use('/api', routes)
app.use(express.json());
// app.use(cors({
//     origin: '*'
// }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
   res.setHeader('Access-Control-Allow-Credentials', "Origin, X-Requested-With, Content-Type, Accept");

  next();
});


// app.use(bodyParser.json());

// app.use(express.urlencoded());
// app.use((req,res,next)=>{
//     res.header('Access-control-Allow-Origin', '*')
//     console.log(req.body,'body')
//     next()
// })



const dbURL= 'mongodb+srv://roshandhawde:R7que5iNUxc2tS9G@cluster0.ssb34bt.mongodb.net/?retryWrites=true&w=majority'

console.log('hello world')

mongoose.connect(dbURL,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{console.log('data base is connected...')
}).catch((err)=>{console.log('issue')})
const database = mongoose.connection
console.log(database,'qq')


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
    console.log(database,'qqq')
})
app.listen(port , ()=>{
    console.log(`server started at http://localhost:${port}`)
})