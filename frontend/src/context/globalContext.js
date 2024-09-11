import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
// createContext: Creates a context to share data across components without passing props manually at every level.
// Axios is a library used for making HTTP requests.

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = createContext()

export const GlobalProvider = ({children})=>{

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes

    const addIncome = async (income) => {
        // const response = await axios.post(`${BASE_URL}add-income`, income)
        //     .catch((err) =>{
        //         setError(err.response.data.message)
        //     })
        // getIncomes()

        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            if (response.status === 201) {
                // Only call getIncomes when the income is successfully added
                getIncomes();
                setError(null);  // Reset error if the request is successful
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add income. Please try again.");
        }
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }
    
    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    } 

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    // calculate expenses
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 3)
    }
    
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome, 
            addExpense,
            expenses,
            getExpenses,
            deleteExpense,
            totalExpenses, 
            totalBalance,
            transactionHistory,
            error,
            setError,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext);
}
