import { RenderOrderSummary } from "./checkout/orderSummary.js";
import { RenderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    })

}).then(()=>{
    RenderOrderSummary();
    RenderPaymentSummary()

})
// loadProducts(()=>{

//     RenderOrderSummary();
//     RenderPaymentSummary()
// })


