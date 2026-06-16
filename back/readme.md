# The Doum Academy Backend API

## 1. 로컬 개발 환경 구축 (Local Setup)
#### Step 1. 가상환경 구성 및 의존성(Dependencies) 설치
프로젝트의 back 디렉토리로 이동한 후 가상환경을 활성화하고 필요한 패키지들을 일괄 설치합니다.

```py
cd back

# Python 가상환경 생성 및 활성화 (Mac/Linux 규격)
python3 -m venv venv
source venv/bin/activate

# 필수 패키지 일괄 설치
pip install -r requirements.txt
```

### Step 2. 로컬 환경변수 세팅 (.env)
보안을 위해 실제 운영 서버 자격 증명(Credentials)은 제외함.  

현재 폴더에 있는 .env.example 파일을 복사하여 .env 파일을 생성하고 본인의 로컬 데이터베이스 커넥션 정보에 맞게 가공

**주의**: .env 파일은 .gitignore에 등록되어 있음

`cp .env.example .env`

### Step 3. 데이터베이스 초기화 및 서버 구동


서버가 최초 기동될 때 lifespan 컨텍스트 매니저가 가동되어   
PostgreSQL 엔진 내부에 필요한 테이블 스키마(Schema)를 자동(init_db())으로 생성.  

`fastapi dev`

서버가 정상 구동되면 `http://localhost:8000` 주소로 런타임 진입이 가능합니다.

## 2. CORS (Cross-Origin Resource Sharing) 정책

http://localhost:3000 (Next.js 로컬 기본 주소)

http://127.0.0.1:3000

**참고**: 쿠키 및 인증 헤더(Authorization) 전송을 허용하는 allow_credentials=True 가 설정되어 있으므로, 어드민(Admin) 기능을 위한 JWT(JSON Web Token) 연동 테스트가 완벽히 지원.

## 핵심 API 엔드포인트 라우팅 명세 (API Endpoints)
전체 라우터(include_router) 규격에 맞춘 인터페이스 목록입니다. 각 도메인별 세부 JSON 데이터 명세 및 테스트는 서버 구동 후 Swagger UI 문서(http://localhost:8000/docs)를 켜서 직접 호출해 보며 확인하는 것이 가장 정확합니다.

### 1. 일반 사용자 공개 API (Public Endpoints - 프론트엔드 메인 작업 타겟)
`GET  /`  : 백엔드 서버 헬스 체크 및 환영 인사 -> {"Hello": "The Doum Academy API"}

`GET  /locations`  : 학원 오시는 길 및 지점 정보 리스트 조회 -> 지점명, 주소, 위경도 좌표 데이터 배열

`GET  /services`  : 교육 프로그램 및 커리큘럼 코스 목록 로드 -> 코스명, 대상 연령, 상세 커리큘럼 스펙

`POST /inquiries ` : 상담 신청 / 문의하기 데이터 신규 등록 -> 이름, 연락처, 희망 과목, 문의 본문 (JSON)

`GET  /teachers`  : 강사진 프로필 및 소개 데이터 조회 -> 강사명, 약력, 담당 클래스, 이미지 경로

`GET  /achievements`  : 학원 주요 성과 및 합격 대장 리스트 로드 -> 합격 연도, 학교/자격증 명칭, 달성 인원

`GET  /faqs`  : 자주 묻는 질문 및 답변 목록 조회 -> 질문(Question), 답변(Answer), 카테고리 분류

`GET  /reviews`  : 수강생 및 학부모 리얼 리뷰 데이터 정렬 조회 -> 작성자명, 별점(Star), 국문/영문 리뷰 텍스트

`GET  /extra_data`  : 메인 배너, 팝업창 등 동적 UI 레이아웃 데이터 조회 -> UI 위치 코드, 노출 플래그, 이미지 URL

### 2. 어드민 전용 인증 API (Admin Authentication Endpoints)
관리자 패널 진입 및 데이터 제어를 위한 백엔드 가드 라우터입니다.

`POST /auth/register`  : 신규 관리자 가입 신청 -> 기본값 승인 대기 상태 (is_approved=False)

`POST /auth/login ` : 관리자 로그인 및 JWT 토큰 발급 -> ID/PW 검증 및 마스터 승인 상태 교차 체크

## 4. 대화형 API 문서화 도구 (Interactive API Docs)
FastAPI 인프라가 지원하는 자동 문서화 도구를 통해 백엔드 코드를 열어보지 않고도 샌드박스 환경에서 API를 직접 호출하고 리스폰스(Response) 구조를 파악할 수 있습니다. 

백엔드 서버를 켠 상태로 브라우저를 열어 아래 주소로 진입:

Swagger UI Docs (FM 표준): http://localhost:8000/docs

ReDoc (서술형 명세서 규격): http://localhost:8000/redoc