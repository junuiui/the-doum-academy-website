/* src/app/admin/register/page.tsx */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Briefcase, IdCard } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Instructor',
    email: '',
    loginId: '',
    password: '',
    agreed: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the collection and use of personal information.');
      return;
    }
    console.log('Registration attempt:', formData);
    // Future backend integration
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join the academy admin team</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Devin Shin"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Briefcase size={16} />
              Role
            </label>
            <select
              className={styles.select}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Director">Director</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>

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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <IdCard size={16} />
              Admin ID
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Choose a unique ID"
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
              placeholder="Minimum 8 characters"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                required
                checked={formData.agreed}
                onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
              />
              <span>I agree to the collection and use of personal information for administrative purposes.</span>
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Create Account
          </button>
        </form>

        <div className={styles.footerLinks}>
          <p>
            Already have an account?{' '}
            <Link href="/admin/login" className={styles.link}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
