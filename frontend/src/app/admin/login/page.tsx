/* src/app/admin/login/page.tsx */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsPending(false);

    // For demonstration/testing logic:
    if (formData.loginId === 'test') {
      setIsPending(true);
    } else if (formData.loginId === 'admin' && formData.password === 'password') {
      // Mock success and redirect
      router.push('/admin/dashboard');
    } else {
      setError('Invalid ID or password. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>Welcome back, please login to your account</p>
        </div>

        {isPending && (
          <div style={{
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid var(--secondary-gold)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            color: 'var(--text-dark)',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            <strong>Account Pending Approval</strong>
            <p style={{ marginTop: '0.5rem' }}>Your account has not been activated yet. Please wait for Devin or Kate to approve your registration.</p>
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid #ef4444',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            color: '#ef4444',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            <strong>Login Failed</strong>
            <p style={{ marginTop: '0.25rem' }}>{error}</p>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <User size={16} />
              Admin ID
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter your ID"
              required
              value={formData.loginId}
              onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Lock size={16} />
              Password
            </label>
            <input
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>

        <div className={styles.footerLinks}>
          <Link href="/admin/reset-password" className={styles.link}>
            Forgot Password?
          </Link>
          <p>
            Don't have an account?{' '}
            <Link href="/admin/register" className={styles.link}>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
