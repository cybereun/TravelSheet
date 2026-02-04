
import React from 'react';
import { ListGroup, Badge, Card, Button } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetContext.jsx';
import { formatCurrency } from '../utils/formatCurrency';

function ExpenseList() {
  const { expenses, deleteExpense } = useBudgets();

  return (
    <Card>
      <Card.Body>
        <h2 className="card-title mb-4">거래내역</h2>
        {expenses.length === 0 ? (
          <p className="text-center text-muted">아직 거래 내역이 없습니다.</p>
        ) : (
          <ListGroup variant="flush">
            {expenses.map(expense => (
              <ListGroup.Item 
                key={expense.id} 
                className="d-flex justify-content-between align-items-center px-0"
                style={{ borderBottom: '1px solid #dee2e6' }}
              >
                <div className="me-auto">
                  <strong style={{ fontSize: '1.1rem' }}>{expense.description || expense.category}</strong>
                  <br />
                  <small className="text-muted">{expense.category}</small>
                </div>
                <Badge 
                  bg={expense.amount > 0 ? 'success' : 'danger'} 
                  pill 
                  style={{ fontSize: '1rem', padding: '0.5rem 1rem', marginRight: '1rem' }}
                >
                  {expense.amount > 0 ? '수입' : '지출'}: {formatCurrency(Math.abs(expense.amount))}
                </Badge>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => deleteExpense({ id: expense.id })}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExpenseList;
