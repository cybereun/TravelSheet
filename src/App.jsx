
import React, { Suspense, lazy } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BudgetProvider } from './contexts/BudgetContext';

const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: '800px' }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/" 
                  element={
                    <PrivateRoute>
                      <BudgetProvider>
                        <DashboardPage />
                      </BudgetProvider>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Suspense>
          </div>
        </Container>
      </Router>
    </AuthProvider>
  );
}

// A wrapper for routes that require authentication
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;
