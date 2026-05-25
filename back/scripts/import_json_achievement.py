import sys
import os
import json
from sqlmodel import Session

# 프로젝트 루트 경로 추가
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from app.core.database import engine
from app.models.achievements import Achievement


def migrate_achievements():
    # JSON 파일이 scripts 폴더 안에 있다면 아래와 같이 경로 설정
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "achievements.json")

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        with Session(engine) as session:
            for entry in data:
                # 1. MongoDB 특유의 필드들 제거 및 변환
                # _id 내의 $oid나 __v 등은 관계형 DB에서 필요 없음
                entry.pop("_id", None)
                entry.pop("__v", None)

                # 2. 날짜 데이터 처리 (문자열인 경우만)
                if isinstance(entry.get("createdAt"), dict):
                    entry["createdAt"] = entry["createdAt"]["$date"]
                if isinstance(entry.get("updatedAt"), dict):
                    entry["updatedAt"] = entry["updatedAt"]["$date"]

                # 3. 모델 생성 (필드 매핑)
                achievement = Achievement(
                    name=entry.get("Name"),
                    school=entry.get("School"),
                    major=entry.get("Major"),
                    scholarship_name=entry.get("ScholarshipName"),
                    scholarship_amount=entry.get("ScholarshipAmount", 0),
                    year=entry.get("Year"),
                )
                session.add(achievement)

            session.commit()
            print(f"✅ Successfully migrated {len(data)} achievements.")

    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    migrate_achievements()
