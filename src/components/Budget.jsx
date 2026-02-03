
import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { db } from '../services/firebase';
import { ref, set, onValue } from "firebase/database";
import { useAuth } from '../contexts/AuthContext';

function Budget() {
  const { currentUser } = useAuth();
  const [budget, setBudget] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const budgetRef = useRef();

  useEffect(() => {
    if (currentUser) {
      const budgetDbRef = ref(db, `users/${currentUser.uid}/settings/budget`);
      onValue(budgetDbRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setBudget(data);
        }
      });
    }
  }, [currentUser]);

  const handleSave = () => {
    const newBudget = parseFloat(budgetRef.current.value);
    if (!isNaN(newBudget)) {
      const budgetDbRef = ref(db, `users/${currentUser.uid}/settings/budget`);
      set(budgetDbRef, newBudget);
      setIsEditing(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Budget</Card.Title>
        {isEditing ? (
          <InputGroup>
            <FormControl
              type="number"
              defaultValue={budget}
              ref={budgetRef}
            />
            <Button onClick={handleSave}>Save</Button>
          </InputGroup>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <h2>{new Intl.NumberFormat().format(budget)}</h2>
            <Button variant="outline-primary" onClick={() => setIsEditing(true)}>Edit</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Budget;
