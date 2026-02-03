
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Budget from '../components/Budget';
import Summary from '../components/Summary';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <>
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h1>TravelSheet Dashboard</h1>
          <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Budget />
          <Summary />
        </Col>
        <Col md={8}>
          <ExpenseForm />
          <h2 className="mt-4">Transactions</h2>
          <ExpenseList />
        </Col>
      </Row>
    </>
  );
}

export default DashboardPage;
