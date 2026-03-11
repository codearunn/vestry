const express=require("express");
const cors=require("cors");
const app=express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Imports
const authRoutes=require('./routes/auth.routes');



// Routes
app.use('/api/auth', authRoutes);

module.exports = app;