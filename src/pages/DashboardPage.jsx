
import React from 'react';
import { Button, Col, Row, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Budget from '../components/Budget';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Summary from '../components/Summary';

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Navbar for Logout */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 px-4">
        <Navbar.Brand href="#home" style={{ color: 'white', fontWeight: 'bold' }}>
          여행경비 대시보드
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={handleLogout}>로그아웃</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <div className="container-fluid px-4">
        {/* Top Row: Budget and Summary */}
        <Row className="mb-4">
          <Col md={6}>
            <Budget />
          </Col>
          <Col md={6}>
            <Summary />
          </Col>
        </Row>

        {/* Middle Row: Expense Form */}
        <Row className="mb-4">
          <Col>
            <ExpenseForm />
          </Col>
        </Row>

        {/* Bottom Row: Expense List */}
        <Row>
          <Col>
            <ExpenseList />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DashboardPage;

