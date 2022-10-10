class RulesFunction{

    constructor(){

    }

    getRule(id, rules){
        let rule = {};
        for (let key in rules){
            if (rules[key]['id']===id){
                rule = rules[key];
            }
        }
        return rule
    }

}

export default RulesFunction;