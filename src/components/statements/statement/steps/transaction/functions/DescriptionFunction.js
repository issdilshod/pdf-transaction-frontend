import * as DESCRIPTIONRULEVALUE_CONSTS from '../../../../../../consts/DescriptionRuleValueConsts';

class DescriptionFunction {

    get_consts(rule){
        let result = rule['description_rule']['value'];
        return result;
    }

    get_fully_year_month_day(transaction){
        let date = new Date(transaction['date']);
        let result = 
                    date.getFullYear() + '' + // Year
                    ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + '' + // Month
                    (date.getDate()<10?'0'+date.getDate():date.getDate()); // Day
        return result;
    }

    get_hours_minutes(transaction){
        let date = new Date(transaction['date']);
        let result = 
                    (date.getHours()<10?'0'+date.getHours():date.getHours()) + '' + 
                    (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
        return result;
    }

    get_month_day(transaction){
        let date = new Date(transaction['date']);
        let result = 
                    ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + "/" + // Month
                    (date.getDate()<10?'0'+date.getDate():date.getDate()); // Day
        return result;
    }

    get_random(description, index){
        let result = JSON.parse(description['value']);
        result = JSON.parse(result[index]);
        return result['val'];
    }

    get_select(description, index){
        let result = JSON.parse(description['value']);
        result = result[index]['val'];
        return result;
    }

    get_text(rule){
        let result = JSON.parse(rule['value']);
        result = result['value'];
        return result;
    }

    get_type(description, index){
        let result = JSON.parse(description['value']);
        result = result[index]['val'];
        return result;
    }

    get_year_month_day(transaction){
        let date = new Date(transaction['date']);
        let result = 
                    date.getFullYear().substr(2, 2) + '' + // Year
                    ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + '' + // Month
                    (date.getDate()<10?'0'+date.getDate():date.getDate()); // Day
        return result;
    }

    get_value(transaction, description){
        let result = '';
        let typeOfValue = description['description_rule']['value'];
        if (typeOfValue===DESCRIPTIONRULEVALUE_CONSTS.CUSTOMER) {

        } else if (typeOfValue===DESCRIPTIONRULEVALUE_CONSTS.COMPANY) {

        } else if (typeOfValue===DESCRIPTIONRULEVALUE_CONSTS.ORGANIZATION) {

        } else if (typeOfValue===DESCRIPTIONRULEVALUE_CONSTS.SENDERNAME) {

        }
        //TODO: find real data and set
        result = typeOfValue;
        return result;
    }

}

export default DescriptionFunction;