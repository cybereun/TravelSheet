
import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetContext.jsx';
import { formatCurrency } from '../utils/formatCurrency';

function Budget() {
  const [amount, setAmount] = useState('');
  const { budget, setBudget } = useBudgets();

  useEffect(() => {
    // Display the current budget, ensuring it's a valid number
    setAmount(budget || '');
  }, [budget]);

  const handleSetBudget = (e) => {
    e.preventDefault();
    const newBudget = parseFloat(amount);
    if (!isNaN(newBudget) && newBudget >= 0) {
      setBudget(newBudget);
    } else {
      // Optionally, provide feedback for invalid input
      alert("Please enter a valid, non-negative number for the budget.");
      setAmount(budget || ''); // Revert to the last valid budget
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h2 className="card-title">예산</h2>
        <Form onSubmit={handleSetBudget}>
          <Form.Group>
            <Form.Label>예산 설정</Form.Label>
            <Form.Control 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Current: ${formatCurrency(budget)}`}
              min="0"
              step="1000"
            />
          </Form.Group>
          <Button type="submit" className="mt-3">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Budget;
