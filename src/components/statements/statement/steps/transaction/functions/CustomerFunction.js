

class CustomerFunction{

    constructor(){

    }

    customer_exists_in_list(list, id){
        for (let key in list){
            if (list[key]['id']==id){
                return true;
            }
        }

        return false;
    }
}

export default CustomerFunction;