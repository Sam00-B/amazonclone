import {cart,removeFromCart,updateCartQuantity,updateDeliveryOptions} from "../data/cart.js";
import { products } from "../data/products.js";
import {formatCurrencency} from "./utlis/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { deliveryDate} from "../data/deliveryOptions.js";
let cartItemHtml="";
cart.forEach((item)=>{
    const productId=item.productId; 
    let matchingProduct;
    products.forEach((product)=>{
            if (product.id===productId){
                matchingProduct=product;
            }
    })
    const deliveryOptionId=item.deliveryOptionId;
    let deliveryOption;
    deliveryDate.forEach((options)=>{
      if (options.id===deliveryOptionId){
        deliveryOption=options;
      }
    })
    const today=dayjs();
    const deliveryDates=today.add(deliveryOption.deliveryDays,'day');//here it is deliveryDates not deliveryDate like the function we used in below
    const deliveryString=deliveryDates.format("dddd, MMMM D");
    
    

    cartItemHtml+=
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${formatCurrencency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id=${matchingProduct.id} hidden>
                    <input type="number" class="quantity-input js-quantity-input" value="${item.quantity}" min="1">
                    <button class="quantity-update-button js-quantity-update-button" data-product-id=${matchingProduct.id}>Save</button>
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                
              ${deliveryOptionsHtml(matchingProduct,item)}
              </div>
            </div>
          </div>
    `
});
function deliveryOptionsHtml(matchingProduct,item){
  let deliveryOptionsHtml="";
  deliveryDate.forEach((deliveryOptions)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryOptions.deliveryDays,'day');
    const deliveryString=deliveryDate.format("dddd, MMMM D");
    const priceString=deliveryOptions.priceCents===0?"Free Shipping":`${formatCurrencency(deliveryOptions.priceCents)} -`;
    const isChecked=deliveryOptions.id===item.deliveryOptionId;
    deliveryOptionsHtml+=`
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-options-id="${deliveryOptions.id}">
         
                    <input type="radio"
                      ${isChecked?"checked":""}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${deliveryString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} - Shipping
                      </div>
                    </div>
                  </div>

    `
  })
  return deliveryOptionsHtml;

}
document.querySelector(".js-order-summary").innerHTML=cartItemHtml;
document.querySelectorAll(".js-delete-link").forEach((link)=>{
    link.addEventListener("click",()=>{
        let productId=link.dataset.productId;

        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();

    })
})
document.querySelectorAll(".js-update-link").forEach((link)=>{
    link.addEventListener("click",()=>{
        const productId=link.dataset.productId;
        link.hidden=true;
        const container=link.nextElementSibling;
        container.hidden=false;
        const saveButton=container.querySelector(".js-quantity-update-button");
        const quantityInput=container.querySelector(".js-quantity-input");
        saveButton.addEventListener("click",()=>{
          const newQuantity=Number(quantityInput.value);
          if (newQuantity<1){
            return alert("Quantity must be at least 1");
          }
          updateCartQuantity(productId,newQuantity);
          const quantityLabel = document.querySelector(
        `.js-cart-item-container-${productId} .quantity-label`
      );
      quantityLabel.innerText = newQuantity;
      link.hidden=false;
      container.hidden=true;

        },{once:true})
    })
})
 document.querySelectorAll(".js-delivery-option").forEach((element)=>{
   element.addEventListener("click",()=>{
     const{productId,deliveryOptionsId}=element.dataset;
     updateDeliveryOptions(productId,deliveryOptionsId)

   })
 })
