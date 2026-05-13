import sys
import os
import json
from sqlmodel import Session, SQLModel

# 경로 설정
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from app.core.database import engine
from app.models.locations import Location


def migrate_locations():
    # 1. 테이블 생성 확인
    print("🚀 Initializing tables...")
    SQLModel.metadata.create_all(engine)

    # 2. JSON 로드
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "locations.json")

    if not os.path.exists(file_path):
        print(f"❌ Error: {file_path} not found.")
        return

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        with Session(engine) as session:
            for entry in data:
                # MongoDB 구조 변환
                loc_obj = Location(
                    mongodb_id=entry["_id"]["$oid"],
                    location_name=entry["location"],
                    address=entry["address"],
                    phone=entry["phone"],
                    email=entry["email"],
                    map_embed_link=entry["mapEmbedLink"],
                    directions_base=entry["directionsBase"],
                )
                session.add(loc_obj)

            session.commit()
            print(f"✨ Successfully migrated {len(data)} locations.")

    except Exception as e:
        print(f"❌ Migration failed: {e}")


if __name__ == "__main__":
    migrate_locations()
