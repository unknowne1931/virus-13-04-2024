const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const ap = express();
const port = 5000;
app.use(express.static('public'))
app.use(express.json());
app.use(bodyParser.json());


app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

mongoose.connect('mongodb+srv://darshanckick:kick@virus1931.0mfsbke.mongodb.net/?retryWrites=true&w=majority&appName=virus1931');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

const CommandSchema = new mongoose.Schema({
    name : String,
    data : String,
    cmd : String
});

const Cmdmodule = mongoose.model('Command', CommandSchema);


app.post('/post/cmand/data', async(req, res) =>{
    const {cmd , data} = req.body;

    try{
        const name = "kick"
        const user = await Cmdmodule.findOne({name})
        if(user){
            const user1 = await Cmdmodule.findOne({name})
            user1.cmd = cmd;
            user1.data = data;
            await user1.save()
            res.json({Status : "OK"})
        }else{
            await Cmdmodule.create({cmd, data, name})
            res.json({Status : "OK"})

        }
    } catch (error){
        console.log("error " , error)
        res.json({"error on posting data : " : error})
    }
})


ap.get('/get/cmd/data', async (req, res) =>{
    try{
        const name = "kick"
        const user = await Cmdmodule.findOne({name})
        return res.json({user})
    } catch (error){
        console.log(error)
        res.json({message : "error on get", error})
    }
})  

app.get('/get/cmd/data/onley', async (req, res) =>{
    try{
        const name = "kick"
        const user = await Cmdmodule.findOne({name})
        return res.json({user})
    } catch (error){
        console.log(error)
        res.json({message : "error on get", error})
    }
})  


app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});

ap.listen(80, () => {
    console.log(`Server is running on port 80`);
  });
