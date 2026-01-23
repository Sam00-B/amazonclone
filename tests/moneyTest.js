import { formatCurrencency } from "../Js scripts/utlis/money.js";
console.log("Test Suite: formatCurrencency");
console.log("converting cents to dollars test");
if(formatCurrencency(2095)==="$20.95"){
    console.log("money test passed");

}else{
    console.log("money test failed");
}
console.log("works with 0");
if(formatCurrencency(0)==="$0.00"){
    console.log("money test passed");
}else{
    console.log("money test failed");
}
console.log("rounds correctly");
if(formatCurrencency(2000.5)==="$20.01"){
    console.log("money test passed");
}else{
    console.log("money test failed");
}



