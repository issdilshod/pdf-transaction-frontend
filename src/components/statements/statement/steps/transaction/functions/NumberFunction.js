

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

}

export default NumberFunction;