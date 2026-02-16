import { RenderOrderSummary } from "./checkout/orderSummary.js";
import { RenderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
loadProducts(()=>{

    RenderOrderSummary();
    RenderPaymentSummary()
})


