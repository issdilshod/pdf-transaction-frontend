

class TypeFunction{

    constructor(){
        this.Deposits = "Deposits";
        this.Withdrawals = "Withdrawals";
    }

    get_deposits_value(period){
        let result = '';
        for (let key in period['types']){
            if (period['types'][key]['name']==this.Deposits){
                result = period['types'][key]['value'];
            }
        }
        return result;
    }

    get_withdrawals_value(period){
        let result = '';
        for (let key in period['types']){
            if (period['types'][key]['name']==this.Withdrawals){
                result = period['types'][key]['value'];
            }
        }
        return result;
    }

    get_deposits_count(period, types){
        let result = 0;
        for (let key in period['transactions']){
            let type = this.#determineType(period['transactions'][key]['type_id'], types);
            if (type['name']==this.Deposits){
                result++;
            }
        }
        return result;
    }

    get_withdrawals_count(period, types){
        let result = 0;
        for (let key in period['transactions']){
            let type = this.#determineType(period['transactions'][key]['type_id'], types);
            if (type['name']==this.Withdrawals){
                result++;
            }
        }
        return result;
    }

    #determineType(id, types){
        for (let key in types){
            if (id==types[key]['id']){
                return types[key];
            }
        }
    }

    get_days_in_cycle(date){
        date = new Date(date);
        return date.getDate();
    }

    get_average_balance(period, types){
        let result = 0;
        let group_date = this.get_table_daily_balance(period, types);  
        
        for (let key in group_date){
            result += group_date[key]['ending_balance'];
        }

        result = result/group_date.length;
        return result;
    }

    get_table_daily_balance(period, types){
        let result = this.#get_daily_table(period, types);
        result = this.#get_daily_begin_ending(result, period['begining_balance']);
        return result;
    }

    #get_daily_table(period, types){
        let group_date = [];
        for (let key in period['transactions']){
            let date = new Date(period['transactions'][key]['date']);
            let check_date = (date.getMonth()<10?'0'+date.getMonth():date.getMonth()) + '/' + (date.getDate()<10?'0'+date.getDate():date.getDate());
            let check_type_id = period['transactions'][key]['type_id'];
            let amount = parseFloat(period['transactions'][key]['amount'])||0;
            let type = this.#determineType(check_type_id, types);
            // search in group date
            let exists = false, exists_index;
            for (let key1 in group_date){
                if (group_date[key1]['date'] == check_date){
                    exists = true;
                    exists_index = key1;
                    break;
                }
            }

            // search types
            if (!exists){
                group_date.push({'date': check_date, 'types': [{'type_id': check_type_id, 'type': type, 'value': amount}] });
            }else{
                let exists_type = false, exists_type_index;
                for (let key1 in group_date[exists_index]['types']){
                    if (group_date[exists_index]['types'][key1]['type_id'] == check_type_id){
                        exists_type = true;
                        exists_type_index = key1;
                        break;
                    }
                }
                if (!exists_type){
                    group_date[exists_index]['types'].push({'type_id': check_type_id, 'type': type, 'value': amount});
                }else{
                    group_date[exists_index]['types'][exists_type_index]['value'] += amount;
                }
            }
        }
        group_date.sort(function(a, b) {
            return a.date.localeCompare(b.date);
        });
        return group_date;
    }

    #get_daily_begin_ending(group_date, begining_balance){
        let beg = parseFloat(begining_balance)||0;
        for (let key in group_date){
            let dep = 0, wit = 0;
            group_date[key]['begining_balance'] = beg;
            for (let key1 in group_date[key]['types']){
                if (group_date[key]['types'][key1]['type']['name']==this.Deposits){
                    dep = group_date[key]['types'][key1]['value'];
                }
                if (group_date[key]['types'][key1]['type']['name']==this.Withdrawals){
                    wit = group_date[key]['types'][key1]['value'];
                }
            }
            beg = beg + dep + wit;
            group_date[key]['ending_balance'] = beg;
        }
        return group_date;
    }

}

export default TypeFunction;