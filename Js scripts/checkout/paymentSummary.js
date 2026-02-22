import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js"; 
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrencency } from "../utlis/money.js";
import { addOrder } from "../../data/orders.js";
export function RenderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.forEach((item)=>{
        const product=getProduct(item.productId);
        productPriceCents+=product.priceCents*item.quantity;
        const deliveryOption=getDeliveryOption(item.deliveryOptionId);
        shippingPriceCents+=deliveryOption.priceCents;
        

        

    })
    let totalBeforeTaxCents=productPriceCents+shippingPriceCents;
    let taxCents=totalBeforeTaxCents*0.1;
    let totalCents=totalBeforeTaxCents+taxCents;
    const paymentSummaryHtml=`
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${formatCurrencency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrencency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrencency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrencency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrencency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>

    `
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHtml
    document.querySelector('.js-place-order').addEventListener("click",async()=>{
      try{
        const response= await fetch("https://supersimplebackend.dev/orders",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          cart:cart
        })
      });
      const order=await response.json();
      addOrder(order);

      }catch(error){
        console.log("unexpected error .Please try again later")
      }
      window.location.href="orders.html"
     
    })

    
    

}