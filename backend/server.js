const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;
const workoutRoutes  = require("./routes/workouts")


app.use(express.json());


app.use('/api/workouts',workoutRoutes);

app.get("/", (req,res) => {
    res.json({mssg : 'welcome to the app'});
})


mongoose.connect(process.env.MONGO_URI).then( () => {

    app.listen(port, () => {
        console.log(`listening on ${port}`);
    })

}).catch((e) => {
    console.log(`error in connecting the db : ${e}`);
})
