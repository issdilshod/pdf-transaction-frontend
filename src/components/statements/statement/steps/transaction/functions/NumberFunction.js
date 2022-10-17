

class NumberFunction {
    constructor(){

    }

    random(min, max){
        let result = 0;
        min=parseFloat(min);
        max= parseFloat(max);
        if (!isNaN(min) && !isNaN(max)){
            result = ((Math.random() * (max - min)) + min).toFixed(2);
        }
        return result;
    }

    to_currency(number){
        return new Intl.NumberFormat("en-US", {minimumFractionDigits: 2,  maximumFractionDigits: 2}).format(number);
    }

}

export default NumberFunction;