
import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { db } from '../services/firebase';
import { ref, onValue, remove } from "firebase/database";
import { useAuth } from '../contexts/AuthContext';

function ExpenseList() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const expensesRef = ref(db, `users/${currentUser.uid}/expenses`);
      onValue(expensesRef, (snapshot) => {
        const data = snapshot.val();
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({ id: key, ...data[key] });
        }
        // Sort expenses by date in descending order
        setExpenses(loadedExpenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      });
    }
  }, [currentUser]);

  const handleDelete = (id) => {
    if (currentUser) {
      const expenseRef = ref(db, `users/${currentUser.uid}/expenses/${id}`);
      remove(expenseRef);
    }
  };

  return (
    <ListGroup>
      {expenses.map(expense => (
        <ListGroup.Item key={expense.id} className="d-flex justify-content-between align-items-center">
          <div>
            <span className={expense.amount < 0 ? 'text-danger' : 'text-success'}>
              {new Intl.NumberFormat().format(expense.amount)}
            </span>
            <small className="ms-2 text-muted">{expense.category}</small>
            <div className="text-muted">{expense.description}</div>
          </div>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(expense.id)}>&times;</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ExpenseList;
