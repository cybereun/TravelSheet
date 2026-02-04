
import React from 'react';
import { Card } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetContext';
import { formatCurrency } from '../utils/formatCurrency';

function Summary() {
  const { budget, expenses } = useBudgets();

  // 수입만 계산 (양수 금액)
  const totalIncome = expenses
    .filter(expense => expense.amount > 0)
    .reduce((total, expense) => total + expense.amount, 0);

  // 지출만 계산 (음수 금액)
  const totalSpending = expenses
    .filter(expense => expense.amount < 0)
    .reduce((total, expense) => total + expense.amount, 0);

  // 남은 금액 계산 (예산 + 수입 + 지출)
  const remaining = budget + totalIncome + totalSpending;

  return (
    <Card>
      <Card.Body>
        <h2 className="card-title">요약</h2>
        <div>총 예산: {formatCurrency(budget)}</div>
        <div>총 수입: {formatCurrency(totalIncome)}</div>
        <div>총 지출: {formatCurrency(Math.abs(totalSpending))}</div>
        <hr />
        <h4 style={{ color: remaining < 0 ? 'red' : 'inherit', fontWeight: 'bold' }}>
          남은 금액: {formatCurrency(remaining)}
        </h4>
      </Card.Body>
    </Card>
  );
}

export default Summary;
