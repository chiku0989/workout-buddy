const Workout = require("./../models/workoutModel");
const mongoose = require("mongoose")
//get all workout
const getWorkouts = async (req,res) => {

    try{
        const workouts = await Workout.find({}).sort({createdAt : -1});
        res.status(200).json(workouts);
    } catch (e) {
        res.status(400).json({mssg : e})
    }

}

//get a single workout

const getWorkout = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "workout not found"});
    }

    const workout = await Workout.findById(id)

    if( !workout) {
       return res.status(404).json({error : "workout not found"});
    }

    res.status(200).json(workout);
}

//create a new workout
const createWorkout = async (req,res) => {

    const {title,reps,load} = req.body;
    try{

        const workout = await Workout.create({title,reps,load})
        res.status(200).json(workout);

    } catch(e){
         console.log("an error occured : " + e)
         res.status(400).json(e);
    }
}

//delete a workout

const deleteWorkout = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "workout not found"});
    }

    const workout = await Workout.findByIdAndDelete(id)
    if( !workout) {
        return res.status(404).json({error : "workout not found"});
     } 
     
     res.status(200).json(workout);
}
//update a workout
const updateWorkout = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "workout not found"});
    }

    const workout = await Workout.findOneAndUpdate({_id : id},{
        ...req.body
    })

    if( !workout) {
        return res.status(404).json({error : "workout not found"});
     } 
     
     res.status(200).json({mssg : "Updated Successfully"});
}
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}