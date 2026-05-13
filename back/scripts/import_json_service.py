import sys
import os
import json
from sqlmodel import Session, SQLModel

# 경로 설정
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from app.core.database import engine
from app.models.services import Service


def migrate_services():
    print("🚀 Initializing Service table...")
    SQLModel.metadata.create_all(engine)

    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "services.json")

    if not os.path.exists(file_path):
        print(f"❌ Error: {file_path} not found.")
        return

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        with Session(engine) as session:
            for entry in data:
                # MongoDB 구조 변환
                service_obj = Service(
                    id=entry["id"],  # JSON에 있는 1, 2, 3 사용
                    mongodb_id=entry["_id"]["$oid"],
                    title=entry["title"],
                    body=entry["body"],
                    created_at=entry["createdAt"]["$date"],
                    updated_at=entry["updatedAt"]["$date"],
                )
                session.add(service_obj)

            session.commit()
            print(f"✨ Successfully migrated {len(data)} services.")

    except Exception as e:
        print(f"❌ Migration failed: {e}")


if __name__ == "__main__":
    migrate_services()
