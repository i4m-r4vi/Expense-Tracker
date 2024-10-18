const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/expenseTracker").then(()=>{
    console.log('Mongodb is connected');
}).catch((err)=>{
    console.log(err);
})

const transactionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

const transaction=mongoose.model('transaction',transactionSchema);

module.exports=transaction;