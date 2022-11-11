import * as DESCRIPTIONRULEVALUE_CONSTS from '../../../../../../consts/DescriptionRuleValueConsts';
import * as DESCRIPTIONRULES_CONSTS from '../../../../../../consts/DescriptionRuleConsts';

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
        result = JSON.parse(result[index]);
        if (result['val']==''){ // then get standart
            result = description['description']['rules'][index]['description_rule']['value'];
        }else{
            result = result['val'];
        }
        return result;
    }

    get_text(rule){
        let result = JSON.parse(rule['value']);
        result = result['value'];
        return result;
    }

    get_type(description, index){
        let result = JSON.parse(description['value']);
        result = JSON.parse(result[index]);
        
        if (result=='' || result==null){ // then get standart
            result = description['description']['rules'][index]['description_rule']['value'];
        }
        return result;
    }

    get_year_month_day(transaction){
        let date = new Date(transaction['date']);
        let result = 
                    date.getFullYear().toString().substr(2, 2) + '' + // Year
                    ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + '' + // Month
                    (date.getDate()<10?'0'+date.getDate():date.getDate()); // Day
        return result;
    }

    get_value(statement, period, transaction, description, cut = false){
        let result = '';
        let typeOfValue = description['description_rule']['value'];
        if (typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.CUSTOMER || typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.CUSTOMERCUT) {
            if (transaction['customer_id']!='' && transaction['customer_id']!=null){
                typeOfValue = transaction['customer']['name'].toUpperCase();
            }
        } else if (typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.COMPANY || typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.COMPANYCUT) {
            typeOfValue = statement['company']['name'].toUpperCase();
        } else if (typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.ORGANIZATION || typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.ORGANIZATIONCUT) {
            typeOfValue = statement['organization']['name'].toUpperCase();
        } else if (typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.SENDERNAME || typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.SENDERNAMECUT) {
            if (transaction['sender_id']!='' && transaction['sender_id']!=null){
                typeOfValue = transaction['sender']['name'].toUpperCase();
            }
        } else if (typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.SENDERID || typeOfValue==DESCRIPTIONRULEVALUE_CONSTS.SENDERIDCUT) {
            if (transaction['sender_id']!='' && transaction['sender_id']!=null){
                typeOfValue = transaction['sender']['it_id'];
            }
        }

        // cut
        let tmpRes = typeOfValue;
        if (cut){
            let values = JSON.parse(description['value']);
            let value = parseInt(values['value']);
        
            tmpRes = '';
            for (let i=0; i< value; i++){
                if (i>=typeOfValue.length){
                    tmpRes += ' ';
                }else{
                    tmpRes += typeOfValue.substr(i, 1);
                }
            }
        }

        result = tmpRes;
        return result;
    }

    get_string_description(statement, period, transaction, description){
        //let values = JSON.parse(description['value']);

        let result = '';
        for (let key in description['description']['rules']){
            let type = description['description']['rules'][key]['description_rule']['type'];
            if (type==DESCRIPTIONRULES_CONSTS.CONST){
                result += this.get_consts(description['description']['rules'][key]);
            }else if (type==DESCRIPTIONRULES_CONSTS.FULL_YEAR_MONTH_DAY){
                result += this.get_fully_year_month_day(transaction);
            }else if (type==DESCRIPTIONRULES_CONSTS.HOURS_MINUTES){
                result += this.get_hours_minutes(transaction);
            }else if (type==DESCRIPTIONRULES_CONSTS.MONTH_DAY){
                result += this.get_month_day(transaction);
            }else if (type==DESCRIPTIONRULES_CONSTS.RANDOM){
                result += this.get_random(description, key);
            }else if (type==DESCRIPTIONRULES_CONSTS.SELECT){
                result += this.get_select(description, key);
            }else if (type==DESCRIPTIONRULES_CONSTS.TEXT){
                result += this.get_text(description['description']['rules'][key]);
            }else if (type==DESCRIPTIONRULES_CONSTS.TYPE){
                result += this.get_type(description, key);
            }else if (type==DESCRIPTIONRULES_CONSTS.YEAR_MONTH_DAY){
                result += this.get_year_month_day(transaction);
            }else if (type==DESCRIPTIONRULES_CONSTS.VALUE){
                result += this.get_value(statement, period, transaction, description['description']['rules'][key]);
            }
            else if (type==DESCRIPTIONRULES_CONSTS.VALUE_CUT){
                result += this.get_value(statement, period, transaction, description['description']['rules'][key], true);
            }
        }
        return result;
    }

}

export default DescriptionFunction;