class TypeFunction{

    constructor(){

    }

    getTypeName(id, types){
        let typeName = '';
        for (let key in types){
            if (types[key]['id']==id){
                typeName = types[key]['name'];
            }
        }
        return typeName;
    }

    getTypeCategories(id, types){
        let categories = [];
        for (let key in types){
            if (types[key]['id']==id){
                categories = types[key]['transaction_categories'];
            }
        }
        return categories;
    }

    getTypeCategory(type_id, category_id, types){
        let category = {};
        for (let key in types){
            if (types[key]['id']==type_id){
                for (let key1 in types[key]['transaction_categories']){
                    if (types[key]['transaction_categories'][key1]['id']==category_id){
                        category = types[key]['transaction_categories'][key1];
                    }
                }
            }
        }
        return category;
    }

}

export default TypeFunction;