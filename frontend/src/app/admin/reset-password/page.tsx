/* src/app/admin/reset-password/page.tsx */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset request for:', email);
    setSubmitted(true);
    // Future backend integration
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>
            {submitted
              ? "If an account exists for this email, you will receive instructions shortly."
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        {!submitted ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                className={styles.input}
                placeholder="admin@doumacademy.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className={styles.footerLinks}>
            <button
              onClick={() => setSubmitted(false)}
              className={styles.submitButton}
              style={{ width: '100%' }}
            >
              Resend Link
            </button>
          </div>
        )}

        <div className={styles.footerLinks}>
          <Link href="/admin/login" className={styles.link} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
