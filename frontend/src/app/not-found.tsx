'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    const isKo = pathname.startsWith("/ko");

    return (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h1>404</h1>
            <h2>{isKo ? '페이지를 찾을 수 없습니다.' : 'Page Not Found'}</h2>
            <p>{isKo ? '요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.' : 'The page you are looking for might have been removed.'}</p>
            <Link href={isKo ? '/ko' : '/'}>
                <button style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    background: '#100d74',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}>
                    {isKo ? '홈으로 돌아가기' : 'Go Home'}
                </button>
            </Link>
        </div>
    );
}
