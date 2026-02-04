
import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function RegisterPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('비밀번호가 일치하지 않습니다');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/'); // Redirect to dashboard on successful signup
    } catch (err) {
      // Provide more specific feedback based on the error from Firebase
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('이미 등록된 이메일입니다.');
          break;
        case 'auth/invalid-email':
          setError('유효한 이메일 주소를 입력하세요.');
          break;
        case 'auth/weak-password':
          setError('비밀번호는 6자리 이상이어야 합니다.');
          break;
        default:
          setError('계정 생성에 실패했습니다. 콘솔에서 자세한 내용을 확인하세요.');
          console.error("Firebase signup error:", err); // Log the full error for debugging
          break;
      }
    }

    setLoading(false);
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">회원가입</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-3" type="submit">회원가입</Button>
        </Form>
        <div className="w-100 text-center mt-2">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RegisterPage;
