/* src/app/admin/login/page.tsx */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, User } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Future backend integration
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>Welcome back, please login to your account</p>
        </div>

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
