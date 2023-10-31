package wara.product.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wara.product.productEntity.ProductEntity;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity,String> {

    ProductEntity getByProductId(Long Id);
    List<ProductEntity> getAllByProductId(String category);

}
