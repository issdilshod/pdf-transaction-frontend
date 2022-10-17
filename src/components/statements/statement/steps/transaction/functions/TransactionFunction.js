import DescriptionFunction from "./DescriptionFunction";
import NumberFunction from "./NumberFunction";

class TransactionFunction {
    constructor(){
        this.offset = {
            'start': {
                'x': -4282,
                'y': -140,
            },
            'amount_digits': { // how much digits on amount determine offset
                '3': {'amount': 3822, 'date': -4279},
                '4': {'amount': 3765, 'date': -4222},
                '5': {'amount': 3724, 'date': -4181},
                '6': {'amount': 3682, 'date': -4139}, 
                '7': {'amount': 3613, 'date': -4070},
            },
            'continue': {
                'amount_digits': {
                    '3' : -372, 
                    '4' : -315, 
                    '5' : -274, 
                    '6' : -232, 
                    '7' : -163
                }
            },
            'total': {
                '3' : 3692, 
                '4' : 3635, 
                '5' : 3594, 
                '6' : 3552, 
                '7' : 3483
            }
        }
        this.negative = { 
            'x': 27,
            'y': -13
        };
        this.descriptionFunction = new DescriptionFunction();
        this.numberFunction = new NumberFunction();
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

    get_period_pages(period, categories, pages){
        let result = this.#get_offset_for_transaction({...period}, [...categories], [...pages]);
        result = this.#get_transaction_pages({...period}, [...pages]);
        return result;
    }

    get_pdf_content_lines(period, pages){
        period['pdf_content']['lines'] = [];
        const standart = "0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 {offset} m\n4800 {offset} l\nS";
        let result = '', page_id = '', last_page_id = '';
        for (let key in period['transactions']){
            if (period['transactions'][key]['offset']['id']!=''){
                page_id = period['transactions'][key]['offset']['id'];
                let tmpPage = this.#get_page(pages, page_id);
                if (page_id!=last_page_id){ // new page
                    last_page_id = page_id;
                    result = standart.replaceAll("{offset}", tmpPage['start_offset']) + "\n";
                    result += standart.replaceAll("{offset}", period['transactions'][key]['offset']['value']) + "\n";
                }else{
                    result += standart.replaceAll("{offset}", period['transactions'][key]['offset']['value']) + "\n";
                }

                // set pdf content
                let exists = false, exists_index;
                for (let key1 in period['pdf_content']['lines']){
                    if (period['pdf_content']['lines'][key1]['id']==page_id){
                        exists = true;
                        exists_index = key1;
                        break;
                    }
                }

                if (!exists){
                    period['pdf_content']['lines'].push({ 'id': page_id, 'page': tmpPage['page'], 'content': result });
                }else{
                    period['pdf_content']['lines'][exists_index]['content'] = result;
                }
            }
        }

        return period;
    }

    get_pdf_content_transactions(statement, period, pages){
        period['pdf_content']['transactions'] = [];
        let page_id = '', last_page_id = '', last_amount = '', count_last_description = '';
        let result = '';
        for (let key in period['transactions']){
            if (period['transactions'][key]['offset']['id']!=''){
                let date = '', tmpContent = [], amount = '';

                //#region get all description/date/amount one by one and set to tmp pdf content

                // description
                for (let key1 in period['transactions'][key]['descriptions']){
                    let tmpDesc = this.descriptionFunction.get_string_description(statement, period, period['transactions'][key], period['transactions'][key]['descriptions'][key1]);
                    tmpContent.push('('+tmpDesc+')Tj');
                }

                // date
                date = new Date(period['transactions'][key]['date']);
                date = 
                    ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + '/' + // Month
                    (date.getDate()<10?'0'+date.getDate():date.getDate()) + '/' + // Day
                    date.getFullYear().toString().substr(2, 2); // Year

                // amount
                amount = this.numberFunction.to_currency(period['transactions'][key]['amount']);

                //#endregion

                //#region determine page mod

                let page_mod = false;
                let tmpPage = {}
                if (period['transactions'][key]['offset']['id']!=''){
                    tmpPage = this.#get_page(pages, period['transactions'][key]['offset']['id']);
                }
                if ('page' in tmpPage){ page_mod = (tmpPage['page']%2==0); }

                //#endregion
                
                //#region calculate

                page_id = period['transactions'][key]['offset']['id'];
                let tmpX = 0, tmpY = 0, tmpAmountX, tmpAmountY;
                if (page_id!=last_page_id){ // start of page
                    // reset
                    result = '';

                    tmpX = this.offset.start.x;
                    let mod = 0;
                    if (page_mod){ mod = this.negative.y; }

                    tmpY += this.offset.start.y + mod;

                    let negative = 0;
                    if (this.#determine_is_negative(period['transactions'][key]['amount'])){ negative = this.negative.x; }

                    let digit = this.#determine_digit_of_amount(period['transactions'][key]['amount']);

                    tmpAmountX = parseInt(this.offset.amount_digits[digit].amount) + negative;
                    tmpAmountY = (tmpContent.length==1?0:(90*tmpContent.length-1));

                    last_page_id = page_id;
                }else{
                    tmpY = (count_last_description==1?-150:((-150)+(-90*(count_last_description-1))));

                    let negative = 0;
                    if (this.#determine_is_negative(last_amount)){ negative = this.negative.x; }

                    let digit = this.#determine_digit_of_amount(last_amount);
                    tmpX = parseInt(this.offset.amount_digits[digit].date) + negative;

                    digit = this.#determine_digit_of_amount(period['transactions'][key]['amount']);
                    tmpAmountX = parseInt(this.offset.amount_digits[digit].amount) + negative;
                    tmpAmountY = (tmpContent.length==1?0:(90*(tmpContent.length-1)));
                }

                last_amount = period['transactions'][key]['amount'];
                count_last_description = tmpContent.length;

                //#endregion

                //#region set pdf content

                // date
                result += tmpX + ' ' + tmpY + ' Td\n';
                result += '('+date+')Tj\n';
                
                // description
                tmpY = 0;
                result += '457 ' + tmpY + ' Td\n';
                for (let key1 in tmpContent){
                    if (key1>0){
                        result += '0 -90 Td\n';
                    }
                    result += tmpContent[key1] + "\n";
                }

                // amount
                result += tmpAmountX + ' ' + tmpAmountY + ' Td\n';
                result += '('+amount+')Tj\n';

                //#endregion
  
                // set to array
                let exists = false, exists_index;
                for (let key1 in period['pdf_content']['transactions']){
                    if (period['pdf_content']['transactions'][key1]['id']==page_id){
                        exists = true;
                        exists_index = key1;
                        break;
                    }
                }

                if (!exists){
                    period['pdf_content']['transactions'].push({ 'id': page_id, 'page': tmpPage['page'], 'content': result });
                }else{
                    period['pdf_content']['transactions'][exists_index]['content'] = result;
                }
            }
        }

        return period;
    }

    #determine_digit_of_amount(number){
        let digit = parseInt(number).toString().length;
        if (digit>7){ digit = 7; } // tmp
        if (digit<3){ digit = 3; }
        return digit;
    }

    #determine_is_negative(number){
        if ((parseFloat(number)<0)){
            return true;
        }
        return false;
    }

    #get_transaction_pages(period, pages){
        for (let key in period['transactions']){
            if (period['transactions'][key]['offset']['id']!=''){
                let tmpPage = this.#get_page(pages, period['transactions'][key]['offset']['id']);

                let exists = false;
                for (let key1 in period['pages']){
                    if (tmpPage['id']==period['pages'][key1]['id']){
                        exists = true;
                    }
                }
                if (!exists){
                    period['pages'].push(tmpPage);
                }
            }
        }
        return period;
    }

    #get_offset_for_transaction(period, categories, pages){
        // reset empty
        for (let key in period['transactions']){
            period['transactions'][key]['offset'] = {'id': '', 'value': ''};
        }

        // recalculat offsets
        for (let key in period['transactions']){
            if (period['transactions'][key]['category_id']==''){ continue; }

            let offset = this.#get_offset_of_category(period['transactions'][key]['category_id'], categories);
            
            // Check in what page is transactions
            let last_offset_index = '', exists = false;
            for (let i=(key-1); i>=0; i--){
                if (period['transactions'][i]['offset']['id']!=''){
                    last_offset_index = i;
                    exists = true;
                    break;
                }
            }

            // Get page offsets
            let tmpPage, start_offset;
            if (!exists){
                tmpPage = this.#get_page(pages);
                start_offset = tmpPage['start_offset'];
            }else{
                tmpPage = this.#get_page(pages, period['transactions'][last_offset_index]['offset']['id']);
                start_offset = period['transactions'][last_offset_index]['offset']['value'];
            }

            // Offset calculate
            let tmpResOffset = parseInt(start_offset) + parseInt(offset);
            if (tmpResOffset>=parseInt(tmpPage['end_offset'])){ // set offset
                period['transactions'][key]['offset'] = {'id': tmpPage['id'], 'value': tmpResOffset};
            } else { // next page
                let nextPage = this.#find_next_page(pages, tmpPage['id']);
                if (nextPage==false){ // it is last page
                    period['transactions'][key]['offset'] = {'id': tmpPage['id'], 'value': tmpResOffset};
                }else{ // set to next page
                    tmpResOffset = parseInt(nextPage['start_offset']) + parseInt(offset);
                    period['transactions'][key]['offset'] = {'id': nextPage['id'], 'value': tmpResOffset};
                }
            }

        }
        return period;
    }

    #get_offset_of_category(id, categories){
        let result = 0;
        for (let key in categories){
            if (id==categories[key]['id']){
                result = categories[key]['offset'];
            }
        }
        return result;
    }

    #get_page(pages, id = ''){
        let result = '';
        for (let key in pages){
            if (id==''){
                if (pages[key]['start_offset']!='' && pages[key]['start_offset']!=null){
                    result = pages[key];
                    break;
                }
            }else {
                if (pages[key]['id']==id){
                    result = pages[key];
                    break;
                }
            }
        }
        return result;
    }

    #find_next_page(pages, id){
        let result = false, catchIt = false;
        for (let key in pages){
            if (catchIt){
                result = pages[key];
                break;
            }
            if (pages[key]['id']==id){
                catchIt = true;
            }
        }
        return result;
    }


}

export default TransactionFunction;