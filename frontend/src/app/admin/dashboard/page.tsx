/* src/app/admin/dashboard/page.tsx */
'use client';

import { useState } from 'react';
import { Users, Settings, LogOut, CheckCircle, XCircle, Clock } from 'lucide-react';
import styles from '../admin.module.css';

// Mock data for pending users
const PENDING_USERS = [
  { id: 1, name: 'John Doe', role: 'Instructor', email: 'john@example.com', date: '2025-02-11' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className={styles.container} style={{ alignItems: 'flex-start', paddingTop: '4rem' }}>
      <div className={styles.authCard} style={{ maxWidth: '1000px', padding: '2rem' }}>
        <div className={styles.header} style={{ textAlign: 'left', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <p className={styles.subtitle}>Manage academy staff and settings</p>
          </div>
          <button className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'users' ? '2px solid var(--primary-blue)' : 'none',
              color: activeTab === 'users' ? 'var(--primary-blue)' : 'var(--text-light)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'settings' ? '2px solid var(--primary-blue)' : 'none',
              color: activeTab === 'settings' ? 'var(--primary-blue)' : 'var(--text-light)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Settings
          </button>
        </div>

        {activeTab === 'users' ? (
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--primary-blue)' }}>Pending Approvals</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Role</th>
                    <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Email</th>
                    <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {PENDING_USERS.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{user.name}</td>
                      <td style={{ padding: '1rem' }}><span style={{ backgroundColor: 'rgba(0,51,102,0.05)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem' }}>{user.role}</span></td>
                      <td style={{ padding: '1rem', color: 'var(--text-light)' }}>{user.email}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>{user.date}</td>
                      <td style={{ padding: '1rem', display: 'flex', gap: '0.75rem' }}>
                        <button title="Approve" style={{ color: '#10b981', background: 'transparent', border: 'none', cursor: 'pointer' }}><CheckCircle size={20} /></button>
                        <button title="Reject" style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}><XCircle size={20} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
            <Settings size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>Admin settings will be available here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
