import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js"; 
import { getDeliveryOption } from "../../data/deliveryOptions.js";
export function RenderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.forEach((item)=>{
        const product=getProduct(item.productId);
        productPriceCents+=product.priceCents*item.quantity;
        const deliveryOption=getDeliveryOption(item.deliveryOptionId);
        shippingPriceCents+=deliveryOption.priceCents*item.quantity;
        

        

    })
    let totalBeforeTaxCents=productPriceCents+shippingPriceCents;
    let taxCents=totalBeforeTaxCents*0.1;
    let totalCents=totalBeforeTaxCents+taxCents;
    
    

}