import { RenderOrderSummary } from "./checkout/orderSummary.js";
import { RenderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";

async function loadPage(){
    await loadProductsFetch();
        await new Promise((resolve)=>{
        loadProducts(()=>{
            resolve();
        })

    })
    RenderOrderSummary();
    RenderPaymentSummary()
}
loadPage();
// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve();
//     })

// }).then(()=>{
//     RenderOrderSummary();
//     RenderPaymentSummary()

// })

// ])
// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve();
//     })

// }).then(()=>{
//     RenderOrderSummary();
//     RenderPaymentSummary()

// })
// loadProducts(()=>{

//     RenderOrderSummary();
//     RenderPaymentSummary()
// })


