import sys
import os
import json
from sqlmodel import Session

# 1. 프로젝트 루트(back)를 Python 경로에 추가
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# 2. SQLModel 구조에 맞게 import
try:
    # database.py에서 engine을 직접 가져옵니다.
    from app.core.database import engine
    # 모델 파일명이 teachers.py이므로 여기서 Teacher 클래스를 가져옵니다.
    from app.models.teachers import Teacher 
    print("✅ Module import successful.")
except ImportError as e:
    print(f"❌ Import failed: {e}")
    sys.exit(1)

def migrate():
    # SQLModel의 Session을 engine과 함께 사용 (with 문으로 자동 close)
    # 현재 실행 중인 스크립트 파일(import_json_teacher.py)의 디렉토리 경로를 가져옴
    current_script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 해당 디렉토리 내의 teachers.json 경로를 절대 경로로 생성
    json_file_path = os.path.join(current_script_dir, "teachers.json") 
    
    if not os.path.exists(json_file_path):
        print(f"❌ Error: {json_file_path} not found.")
        return

    try:
        with open(json_file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        print(f"🚀 Starting migration for {len(data)} records...")
        
        with Session(engine) as session:
            for entry in data:
                # MongoDB의 _id 제거
                if "_id" in entry:
                    del entry["_id"]
                
                # SQLModel 인스턴스 생성
                teacher_obj = Teacher(**entry)
                session.add(teacher_obj)
            
            session.commit()
            print("✨ Migration completed successfully!")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        # 세션 내 에러 발생 시 자동으로 rollback 처리가 필요할 수 있으나 
        # with Session 블록 내에서 예외 발생 시 commit이 호출되지 않음
    finally:
        pass

if __name__ == "__main__":
    migrate()