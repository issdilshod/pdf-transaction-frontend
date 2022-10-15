
class TransactionFunction {
    constructor(){

    }

    calc_ending_balance(period){
        let result = parseFloat(period['begining_balance']) || 0;
        for(let key in period['transactions']){
            result += parseFloat(period['transactions'][key]['amount']) || 0;
        }
        return result;
    }

    get_period_types(period, types){
        let result = [];
        for (let key in period['transactions']){
            // find type
            let id, name;
            for (let key1 in types){
                if (period['transactions'][key]['type_id']==types[key1]['id']){
                    id = types[key1]['id'];
                    name = types[key1]['name'];
                }
            }

            // if isset in result then plus else create item of array
            let exists = false;
            for (let key1 in result){
                if (result[key1]['id']==id){
                    result[key1]['value'] = ((parseFloat(result[key1]['value'])||0) + (parseFloat(period['transactions'][key]['amount'])||0))
                    exists = true;
                }
            }
            if (!exists){
                result.push({'id': id, 'name': name, 'value': (parseFloat(period['transactions'][key]['amount'])||0) });
            }
        }
        
        result.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        return result;
    }

}

export default TransactionFunction;