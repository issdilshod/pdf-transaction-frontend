
class TransactionFunction {
    constructor(){

    }

    calc_ending_balance(period){
        let result = parseFloat(period['begining_balance']) || 0;
        for(let key in period['transactions']){
            result += parseFloat(period['transactions'][key]['amount']) || 0;
        }
        return result.toFixed(2);
    }

}

export default TransactionFunction;