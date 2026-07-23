const Task = require("../models/Task");


// Create Task
exports.createTask = async (req, res) => {

    try {

        const task = await Task.create({

            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            dueDate: req.body.dueDate,
            createdBy: req.user.id

        });


        // Real-time update
        const io = req.app.get("io");

        if (io) {
            io.emit("taskCreated", task);
        }


        res.status(201).json({
            message: "Task created successfully",
            task
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};





// Get All Tasks
exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            createdBy: req.user.id
        })
        .sort({
            createdAt: -1
        });


        res.json(tasks);


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};






// Update Task
exports.updateTask = async (req,res)=>{

    try{


        const task = await Task.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );


        const io = req.app.get("io");

        if(io){
            io.emit("taskUpdated",task);
        }


        res.json({

            message:"Task updated successfully",
            task

        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};







// Delete Task
exports.deleteTask = async(req,res)=>{

    try{


        const task = await Task.findByIdAndDelete(
            req.params.id
        );


        const io = req.app.get("io");

        if(io){
            io.emit("taskDeleted",task);
        }



        res.json({

            message:"Task deleted successfully"

        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
