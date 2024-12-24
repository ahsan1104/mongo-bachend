import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    User_name: { type: String },
    Phone_number: { type: Number},
    Email: { type: String },
    Date_of_birth : { type: Date },
    desigination : { type: String },
},{
    timestamps: true,
})

const Tasks = mongoose.model('tasks', taskSchema);

export default Tasks;