import json
import logging
from typing import List, Optional, Dict, Any
from pathlib import Path
from app.config import settings
from app.models.schemas import Trip
from app.services.demo_scenarios import get_demo_scenarios_dict

logger = logging.getLogger(__name__)

class StorageService:
    def __init__(self):
        self.supabase_client = None
        self.local_db_file = settings.LOCAL_DB_FILE
        self._init_supabase()
        self._init_local_db()

    def _init_supabase(self):
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            try:
                from supabase import create_client, Client
                self.supabase_client: Client = create_client(
                    settings.SUPABASE_URL,
                    settings.SUPABASE_KEY
                )
                logger.info("Supabase client successfully initialized.")
            except Exception as e:
                logger.warning(f"Failed to initialize Supabase client: {e}. Falling back to local storage.")
                self.supabase_client = None
        else:
            logger.info("No Supabase credentials provided; utilizing local persistent JSON store.")

    def _init_local_db(self):
        settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
        if not self.local_db_file.exists():
            # Seed with demo scenarios
            demo_data = get_demo_scenarios_dict()
            trips_list = [trip.model_dump() for trip in demo_data.values()]
            with open(self.local_db_file, "w", encoding="utf-8") as f:
                json.dump(trips_list, f, indent=2)
            logger.info("Initialized local DB with 3 demo scenarios.")

    def _read_local_trips(self) -> List[Dict[str, Any]]:
        try:
            if not self.local_db_file.exists():
                self._init_local_db()
            with open(self.local_db_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error reading local trips: {e}")
            return []

    def _write_local_trips(self, trips: List[Dict[str, Any]]):
        try:
            with open(self.local_db_file, "w", encoding="utf-8") as f:
                json.dump(trips, f, indent=2)
        except Exception as e:
            logger.error(f"Error writing local trips: {e}")

    def list_trips(self) -> List[Trip]:
        if self.supabase_client:
            try:
                res = self.supabase_client.table("trips").select("*").order("created_at", desc=True).execute()
                if res.data:
                    return [Trip(**item) for item in res.data]
            except Exception as e:
                logger.warning(f"Supabase list_trips error: {e}, falling back to local DB.")

        items = self._read_local_trips()
        trips = []
        for item in items:
            try:
                trips.append(Trip(**item))
            except Exception as e:
                logger.warning(f"Error parsing trip: {e}")
        return trips

    def get_trip(self, trip_id: str) -> Optional[Trip]:
        if self.supabase_client:
            try:
                res = self.supabase_client.table("trips").select("*").eq("id", trip_id).execute()
                if res.data and len(res.data) > 0:
                    return Trip(**res.data[0])
            except Exception as e:
                logger.warning(f"Supabase get_trip error: {e}")

        items = self._read_local_trips()
        for item in items:
            if item.get("id") == trip_id:
                return Trip(**item)
        return None

    def get_trip_by_share_token(self, token: str) -> Optional[Trip]:
        if self.supabase_client:
            try:
                res = self.supabase_client.table("trips").select("*").eq("share_token", token).execute()
                if res.data and len(res.data) > 0:
                    return Trip(**res.data[0])
            except Exception as e:
                logger.warning(f"Supabase get_trip_by_share_token error: {e}")

        items = self._read_local_trips()
        for item in items:
            if item.get("share_token") == token:
                return Trip(**item)
        return None

    def save_trip(self, trip: Trip) -> Trip:
        trip_dict = trip.model_dump()
        
        # Save to Supabase if available
        if self.supabase_client:
            try:
                # Upsert to Supabase
                self.supabase_client.table("trips").upsert(trip_dict).execute()
            except Exception as e:
                logger.warning(f"Supabase upsert error: {e}")

        # Always keep local DB synced
        items = self._read_local_trips()
        replaced = False
        for idx, item in enumerate(items):
            if item.get("id") == trip.id:
                items[idx] = trip_dict
                replaced = True
                break
        if not replaced:
            items.insert(0, trip_dict)
        self._write_local_trips(items)
        return trip

    def delete_trip(self, trip_id: str) -> bool:
        if self.supabase_client:
            try:
                self.supabase_client.table("trips").delete().eq("id", trip_id).execute()
            except Exception as e:
                logger.warning(f"Supabase delete error: {e}")

        items = self._read_local_trips()
        new_items = [i for i in items if i.get("id") != trip_id]
        if len(new_items) != len(items):
            self._write_local_trips(new_items)
            return True
        return False

storage_service = StorageService()
