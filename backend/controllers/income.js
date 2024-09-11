const IncomeSchema = require("../models/IncomeModel")

exports.addIncome = async(req,res)=>{
    const {title,amount,category,description,date} = req.body;
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    // validations
    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: "All fields are required!"})
        }

        if(amount <= 0 || !amount=='number'){
            return res.status(400).json({message: "Amount must be positive!"});
        }

        await income.save();
        res.status(200).json({message:'Income Added'});

    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }

    console.log(income); 
}


exports.getIncomes = async(req,res)=>{
    try {
        // we want to show last added item at the top
        const incomes=await IncomeSchema.find().sort({createdAt: -1}) 
        // createdAt: -1  => sorted in decreasing order 
        res.status(200).json(incomes);  
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

exports.deleteIncome = async(req,res)=>{
    const {id}=req.params;
    IncomeSchema.findByIdAndDelete(id)
    // This part is a promise handler (using .then()). If the deletion is successful:
    .then((income)=>{
        res.status(200).json({message:'Income deleted'});
    })
    .catch((err)=>{
        res.status(500).json({message:'Server Error'});
    })


    // Extracts the id from the request's URL parameters.
    // Tries to find and delete an income document with that id.
    // If successful, sends a success message back to the client.
    // If there’s an error, sends a server error message back to the client.
}