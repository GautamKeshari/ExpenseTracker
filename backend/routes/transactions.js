const express=require('express')
const { addIncome, getIncomes ,deleteIncome} = require('../controllers/income')
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense')
const router = require('express').Router();

// router.get('/',(req,res)=>{
//     res.send("Hello World");
// })

router.post("/add-income", addIncome)
    .get('/get-incomes',getIncomes)
    .delete('/delete-income/:id',deleteIncome)     // here we get params(parameter) as id for deleting income instance
    .post("/add-expense", addExpense)
    .get('/get-expense',getExpense)
    .delete("/delete-expense/:id",deleteExpense)

module.exports = router