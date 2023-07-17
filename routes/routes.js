const express = require('express');
const Model = require('../models/projectmodel');
const bodyParser= require('body-parser')

const router = express.Router()

module.exports = router;

//Post Method
router.post('/post',bodyParser.json(),async(req, res) => {
    // res.send('Post API')
    console.log(req.body,'req')
    try {
    const data =  new Model({
        taskName: req.body.taskName,
        status: req.body.status,
        isEdited:req.body.isEdited,
    })

    
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Get all Method
router.get('/getTodoList',async (req, res) => {
    console.log(res, req)
    try{
        const data = await Model.find();
        res.header("Access-Control-Allow-Origin", "*")

        res.status(200)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/find/:id',async (req, res) => {
    console.log(req)
    // res.send('Get by ID API')
try{
    const data = await Model.findById(req.params.id);
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
})

//Update by ID Method
router.patch('/update/:id',async (req, res) => {
    // res.send('Update by ID API')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async(req, res) => {
    // res.send('Delete by ID API')
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})