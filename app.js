const express = require('express')
const bodyParser = require('body-parser');
const transaction = require('./model/db');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',async (req,res)=>{
    const TransactionArray= await transaction.find({})
    const balance=TransactionArray.reduce((acc,curr)=>{
        acc+=curr.amount
        return acc
    },0)
    const income=TransactionArray.filter(t=>t.amount>0).reduce((acc,curr)=>{
        return acc+curr.amount
    },0)
    const expense=TransactionArray.filter(t=>t.amount<0).reduce((acc,curr)=>{
        return acc+curr.amount
    },0)
    res.render('index',{balance,income,expense,TransactionArray})
})

app.post('/add-transaction',async (req,res)=>{
    const expenseName=req.body.expenseName;
    const amount=req.body.amount;
    const expenseAmount=parseFloat(amount)
    if(!isNaN(expenseAmount)){
        const transactionModel = new transaction({name:expenseName,amount:expenseAmount});
        await transactionModel.save()
        res.redirect('/')
    }else{
        res.redirect('/')
    }
})
app.post('/delete',async (req,res)=>{
    const amount = req.body.dele_amount;
    await transaction.findByIdAndDelete(amount)
    res.redirect('/')
})

app.listen('3000',()=>{
    console.log(`The Port is Listening on http://127.0.0.1:3000`);
})