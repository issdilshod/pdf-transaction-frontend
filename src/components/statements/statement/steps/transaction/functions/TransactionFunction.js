
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

    get_period_pages(period, categories, pages){
        let result = this.#get_offset_for_transaction({...period}, [...categories], [...pages]);
        result = this.#get_transaction_pages({...period}, [...pages]);
        return result;
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
                console.log(nextPage);
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