
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { db } from '../services/firebase';
import { ref, onValue } from "firebase/database";
import { useAuth } from '../contexts/AuthContext';

function Summary() {
  const { currentUser } = useAuth();
  const [budget, setBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    if (currentUser) {
      // Fetch budget
      const budgetDbRef = ref(db, `users/${currentUser.uid}/settings/budget`);
      onValue(budgetDbRef, (snapshot) => {
        setBudget(snapshot.val() || 0);
      });

      // Fetch and calculate total expenses
      const expensesRef = ref(db, `users/${currentUser.uid}/expenses`);
      onValue(expensesRef, (snapshot) => {
        const expenses = snapshot.val();
        let total = 0;
        for (let id in expenses) {
          total += expenses[id].amount;
        }
        setTotalExpenses(total);
      });
    }
  }, [currentUser]);

  const remaining = budget + totalExpenses;

  return (
    <Card className="mb-4">
        <Card.Body>
          <Card.Title>Summary</Card.Title>
          <h5>Budget: {new Intl.NumberFormat().format(budget)}</h5>
          <h5>Expenses: {new Intl.NumberFormat().format(totalExpenses)}</h5>
          <hr />
          <h4>Remaining: {new Intl.NumberFormat().format(remaining)}</h4>
        </Card.Body>
      </Card>
  );
}

export default Summary;
