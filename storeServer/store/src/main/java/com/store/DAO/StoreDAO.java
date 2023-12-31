package com.store.DAO;

import com.store.Entity.StoreEntity;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface StoreDAO {
    public Map<String, Object> createStore(StoreEntity storeEntity);
    public Map<String, Object> readStoreById(Long storeId);
    public Map<String, Object> readStoreByName(String storeName);
    public Map<String, Object> readStoreBySeller(String storeSeller);
    public Map<String, Object> readStoreByCoordinate(Double minX, Double minY, Double maxX, Double maxY);
    public String readStoreImageByStoreNameAndStoreSeller(String storeName, String storeSeller);
    public String readStoreImageByStoreId(Long storeId);
    public Map<String, Object> existStoreById(Long storeId);
    public Map<String, Object> existStoreBySeller(String storeSeller);
    public Map<String, Object> existStoreByNameAndSeller(String storeName, String storeSeller);
    public Map<String, Object> updateStoreByNameAndSeller(StoreEntity storeEntity);
    public Map<String, Object> updateStoreById(StoreEntity storeEntity);
    public Map<String, Object> deleteStore(Long storeId);
    public Boolean deleteProductId(Long storeId, Long productId);
}
