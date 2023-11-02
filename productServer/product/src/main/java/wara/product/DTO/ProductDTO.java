package wara.product.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wara.product.productEntity.ProductEntity;



@Setter @Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    Long productId;
    Long storeId;
    String productName;
    String productPrice;
    String productSize;
    String productColor;
    String productStock;
    String productCategory;



    /**
     * DTO를 Entity로 변환
     * */
    public ProductEntity DTOE()
    {
        return new ProductEntity(
                this.productId,
                this.storeId,
                this.productName,
                this.productPrice,
                this.productSize,
                this.productColor,
                this.productStock,
                this.productCategory
        );
    }


}
