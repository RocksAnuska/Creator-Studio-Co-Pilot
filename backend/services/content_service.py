import json
import os
from datetime import datetime
from typing import List, Optional, Dict
import uuid

class ContentService:
    def __init__(self, storage_file: Optional[str] = None):
        # Use absolute path relative to backend directory
        if storage_file is None:
            backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            storage_file = os.path.join(backend_dir, "data", "content.json")
        self.storage_file = storage_file
        self._ensure_storage_exists()
    
    def _ensure_storage_exists(self):
        """Ensure the storage directory and file exist"""
        os.makedirs(os.path.dirname(self.storage_file), exist_ok=True)
        if not os.path.exists(self.storage_file):
            with open(self.storage_file, 'w') as f:
                json.dump([], f)
    
    def _load_content(self) -> List[Dict]:
        """Load all content from storage"""
        try:
            with open(self.storage_file, 'r') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []
    
    def _save_content(self, content_list: List[Dict]):
        """Save content list to storage"""
        with open(self.storage_file, 'w') as f:
            json.dump(content_list, f, indent=2)
    
    def save_content(
        self,
        content_type: str,
        title: str,
        content: str,
        metadata: Optional[Dict] = None
    ) -> str:
        """Save content and return content ID"""
        content_list = self._load_content()
        
        content_id = str(uuid.uuid4())
        content_item = {
            "id": content_id,
            "type": content_type,
            "title": title,
            "content": content,
            "created_at": datetime.now().isoformat(),
            "metadata": metadata or {}
        }
        
        content_list.append(content_item)
        self._save_content(content_list)
        
        return content_id
    
    def get_content(self, content_id: str) -> Optional[Dict]:
        """Get content by ID"""
        content_list = self._load_content()
        for item in content_list:
            if item.get("id") == content_id:
                return item
        return None
    
    def get_all_content(self, content_type: Optional[str] = None) -> List[Dict]:
        """Get all content, optionally filtered by type"""
        content_list = self._load_content()
        
        if content_type:
            return [item for item in content_list if item.get("type") == content_type]
        
        return content_list
    
    def delete_content(self, content_id: str) -> bool:
        """Delete content by ID"""
        content_list = self._load_content()
        original_length = len(content_list)
        
        content_list = [item for item in content_list if item.get("id") != content_id]
        
        if len(content_list) < original_length:
            self._save_content(content_list)
            return True
        return False
    
    def search_content(self, query: str) -> List[Dict]:
        """Search content by query"""
        content_list = self._load_content()
        query_lower = query.lower()
        
        results = []
        for item in content_list:
            if (query_lower in item.get("title", "").lower() or 
                query_lower in item.get("content", "").lower()):
                results.append(item)
        
        return results

