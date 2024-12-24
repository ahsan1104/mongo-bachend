import express from "express";
import { enums } from "../constant/enum.js";
import Tasks from "../models/taskModel.js";

export const taskRoute = express.Router();

taskRoute.get('/', async (req, res) => {
    try {
        const getAllTask = await Tasks.find();
        res.status(200).send({ status: 200, message: enums.SUCCESS, data: getAllTask });
    } catch (error) {
        console.error("Error fetching tasks:", error); 
        res.status(400).send({ status: 400, message: enums.ERROR_CONECTION });
    }
});

taskRoute.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const response = await Tasks.create(data);
        res.status(200).send({ status: 200, message: enums.SUCCESS_MSG, data: response });
    } catch (error) {
        console.error("Error adding task:", error);  
        res.status(400).send({ status: 400, message: enums.ERROR_CONECTION });
    }
});

taskRoute.delete('/delete/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const deleteTask = await Tasks.findByIdAndDelete(id);
        if(!deleteTask) return res.status(404).send({status:404, message: enums.ERROR_MSG});
        res.status(200).send({status:200, message: enums.DELETE_MSG});
    }
    catch(error){
        console.error("Error deleting task:", error);
        res.status(400).send({status:400, message: enums.ERROR_CONECTION});
    }
})

taskRoute.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Tasks.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) return res.status(404).send({ status: 404, message: enums.ERROR_MSG });
    res.status(200).send({ status: 200, message: enums.UPDATE_MSG, data: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).send({ status: 400, message: enums.ERROR_CONECTION });
  }
});
