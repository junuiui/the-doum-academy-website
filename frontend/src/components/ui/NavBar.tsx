'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { en: 'About Us', ko: '소개', href: '/about-us' },
  { en: 'Achievements', ko: '성과', href: '/achievements' },
  { en: 'Gallery', ko: '갤러리', href: '/gallery' },
  { en: 'FAQ', ko: '자주 묻는 질문', href: '/faq' },
  { en: 'Contact Us', ko: '문의하기', href: '/contact-us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isKo = pathname.startsWith('/ko');

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 resize 체크
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 980);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = (
    <ul className={`${styles.navLinks} ${menuOpen && isMobile ? styles.showMobile : ''}`}>
      {LINKS.map(({ en, ko, href }) => {
        const fullHref = isKo ? `/ko${href}` : href;
        const label = isKo ? ko : en;
        const isActive = pathname === fullHref;

        return (
          <li key={href}>
            <Link
              href={fullHref}
              className={isActive ? styles.active : ''}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>

  );

  return (
    <nav aria-label="Main navigation">
      {isMobile ? (
        <div className={styles.mobileNav}>
          <button onClick={() => setMenuOpen(!menuOpen)} className={styles.hamburger}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          {menuOpen && links}
        </div>
      ) : (
        links
      )}
    </nav>
  );
}
