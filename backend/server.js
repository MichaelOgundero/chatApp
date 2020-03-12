const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { port,atlasURI } = require('./config');


const app = express();
app.use(cors())
app.use(express.json())

//mongoose
mongoose.connect(atlasURI, {useNewUrlParser: true,
                       useCreateIndex: true 
                      })

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
})

//we have to require the files before we use them

const authenticationRouter = require('./routes/authentication');
const userPage = require('./routes/user');

app.use('/authentication', authenticationRouter);
app.use('/user', userPage);

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
})