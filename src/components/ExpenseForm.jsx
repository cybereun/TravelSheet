
import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetContext.jsx';

const categories = [
  "숙박",
  "교통",
  "식비",
  "쇼핑",
  "엔터테인먼트",
  "기타"
];

function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const { addExpense, addIncome } = useBudgets();

  const handleAddExpense = () => {
    const newAmount = parseFloat(amount);
    if (!isNaN(newAmount) && newAmount > 0) {
      addExpense({ amount: newAmount, description, category });
      resetForm();
    }
  };

  const handleAddIncome = () => {
    const newAmount = parseFloat(amount);
    if (!isNaN(newAmount) && newAmount > 0) {
      addIncome({ amount: newAmount, description, category });
      resetForm();
    }
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setCategory(categories[0]);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h2 className="card-title">거래 추가</h2>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>금액</Form.Label>
                <Form.Control 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>카테고리</Form.Label>
                <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mt-3">
            <Form.Label>내용 <span className="text-muted">(선택 사항)</span></Form.Label>
            <Form.Control 
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="지출 또는 수입에 대한 설명"
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="danger" onClick={handleAddExpense} className="me-2">지출 추가 (-)</Button>
            <Button variant="success" onClick={handleAddIncome}>수입 추가 (+)</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ExpenseForm;
