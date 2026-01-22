# TODO List

## Front
1. ~~Services 페이지~~
   - `/services` GET 데이터 가져와서 UI 렌더링
2. ~~Inquiry 폼~~
   - 이름, 이메일, 메시지 등 입력 폼 구현
3. ~~Inquiry 제출~~
   - `/inquiries` POST 요청 보내기
4. Inquiry 목록 페이지 (관리자용)
   - `/inquiries` GET 데이터 렌더링
5. ~~(Optional) 사용자 알림~~
   - 제출 성공/실패 시 Toast 메시지 표시
6. Gallary, Achievement pictures  

## Back
1. ~~Front 연결~~
   - CORS 설정 (`app.use(cors())`) 
   - `/services` GET 라우트 확인
2. ~~Inquiry API~~
   - POST `/inquiries` → 데이터베이스 저장
   - GET `/inquiries` → 저장된 문의 목록 반환
3. (Optional) Inquiry 데이터 밸리데이션
   - 이름, 이메일, 메시지 필수 체크
4. (Optional) 에러 핸들링 개선
   - 공통 에러 처리 미들웨어 활용
5. 구글 리뷰
   - API 등록
6. 학원 서버 연결

<!-- general -->
## General
1. Reload --> Reload components?