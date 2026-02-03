
import React, { useRef } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import { db } from '../services/firebase';
import { ref, push, set } from "firebase/database";
import { useAuth } from '../contexts/AuthContext';

const categories = ["Accommodation", "Transport", "Food", "Cafe", "Sightseeing", "Other"];

function ExpenseForm() {
  const { currentUser } = useAuth();
  const amountRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = (e, isExpense) => {
    e.preventDefault();
    const amount = parseFloat(amountRef.current.value);
    if (isNaN(amount) || amount === 0) return;

    const expense = {
      amount: isExpense ? -amount : amount,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date().toISOString(),
    };

    const expensesRef = ref(db, `users/${currentUser.uid}/expenses`);
    const newExpenseRef = push(expensesRef);
    set(newExpenseRef, expense);

    // Reset form
    amountRef.current.value = "";
    descriptionRef.current.value = "";
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add Transaction</Card.Title>
        <Form>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" ref={amountRef} required placeholder="0.00" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" ref={categoryRef}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={descriptionRef} placeholder="(Optional)" />
          </Form.Group>
          <Row className="mt-3">
            <Col>
              <Button className="w-100" variant="danger" onClick={(e) => handleSubmit(e, true)}>Add Expense (-)</Button>
            </Col>
            <Col>
              <Button className="w-100" variant="success" onClick={(e) => handleSubmit(e, false)}>Add Income (+)</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ExpenseForm;
