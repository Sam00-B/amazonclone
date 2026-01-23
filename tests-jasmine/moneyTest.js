import { formatCurrencency } from "../Js scripts/utlis/money.js";  
describe("Test Suite:formatCurrencency",()=>{
    it('converting cents to dollars test',()=>{
        expect(formatCurrencency(2095)).toEqual("$20.95");
    })
    it('works with 0',()=>{
        expect(formatCurrencency(0)).toEqual("$0.00");
    })
    it('rounds up to nearest cents',()=>{
        expect(formatCurrencency(2000.5)).toEqual("$20.01");
    })
})