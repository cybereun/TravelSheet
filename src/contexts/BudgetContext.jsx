
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

const BudgetContext = createContext();

export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  function addExpense({ amount, description, category }) {
    setExpenses(prevExpenses => [
      ...prevExpenses,
      { id: uuidV4(), amount: -Math.abs(amount), description, category },
    ]);
  }

  function addIncome({ amount, description, category }) {
    setExpenses(prevExpenses => [
      ...prevExpenses,
      { id: uuidV4(), amount: Math.abs(amount), description, category },
    ]);
  }

  function deleteExpense({ id }) {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }

  const value = {
    budget,
    expenses,
    setBudget,
    addExpense,
    addIncome,
    deleteExpense,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};
