import NumberFunction from "./NumberFunction";
import * as DESCRIPTIONRULE_CONST from '../../../../../../consts/DescriptionRuleConsts';

class CategoryFunction {

    constructor(){
        this.numberFunction = new NumberFunction();
        this.transactionLine = {};
    }

    getDescriptions(category){
        let result = [];
        for (let key in category['descriptions']){
            result.push({ 
                'description': category['descriptions'][key], 
                'value': JSON.stringify(this.getValueOfRules(category['descriptions'][key]['rules']))
            });
        }
        return result;
    }

    getValueOfRules(rules){
        let result = [];
        for (let key in rules){
            let tmp = JSON.parse(rules[key]['value']);
            if (tmp!==null){
                tmp['val'] = '';
            }
            if (rules[key]['description_rule']['type']===DESCRIPTIONRULE_CONST.RANDOM){
                tmp['val'] = this.getRandom(tmp);
            }
            result.push(JSON.stringify(tmp));
        }
        return result;
    }

    getRandom(ruleValue){
        let result = ruleValue;
        let randNum = parseInt(this.numberFunction.random(parseInt(result['min']), parseInt(result['max']))).toString();
        let mustLength = result['max'].length;
        for (let i=randNum.length; i<mustLength; i++){
            randNum = '0' + randNum;
            
        }
        result = randNum;
        return result;
    }

}

export default CategoryFunction;