package wara.product.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wara.product.productEntity.OptionEntity;
import wara.product.productEntity.ProductEntity;

import javax.validation.constraints.Null;

@Getter@Setter
@AllArgsConstructor@NoArgsConstructor
public class OptionDTO {


    Long optionId;
    String productPrice;
    String productSize;
    String productColor;
    String productStock;
    String barcodeUrl;


    public OptionEntity toEntity(){
        return new OptionEntity(

                  this.optionId ,
                new ProductEntity(),
                  this.productPrice,
                  this.productSize,
                  this.productColor,
                  this.productStock,
                  this.barcodeUrl
        );
    }
}