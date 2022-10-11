import * as DESCRIPTIONRULES_CONSTS from '../../../../../consts/DescriptionRuleConsts';
import DescriptionFunction from './functions/DescriptionFunction';

const Descriptions = ({periodIndex, transactionIndex, descriptionIndex, description, transaction, onCustomerClick, onSenderClick, onRandomClick, onSelectClick, onTypeClick}) => {
    const descriptionFunction = new DescriptionFunction();

    const onCustomerClickLocal = (index) => {
        console.log(index, 'customer clicked');
    }

    const onSenderClickLocal = (index) => {
        console.log(index, 'sender clicked');
    }

    const onRandomClickLocal = (index) => {
        console.log(index, 'random clicked');
    }

    const onSelectClickLocal = (index) => {
        console.log(index, 'select clicked');
    }

    const onTypeClickLocal = (index) => {
        console.log(index, 'type clicked');
    }
    
    return (
        <p>
            {
                description['description']['rules'].map((value, index) => {
                    return (
                        <span key={index}>
                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.CONST) && // consts
                                <span>
                                    { descriptionFunction.get_consts(value) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.FULL_YEAR_MONTH_DAY) && // full year month day
                                <span>
                                    { descriptionFunction.get_fully_year_month_day(transaction) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.HOURS_MINUTES) && // hours minutes
                                <span>
                                    { descriptionFunction.get_hours_minutes(transaction) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.MONTH_DAY) && // month day
                                <span>
                                    { descriptionFunction.get_month_day(transaction) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.RANDOM) && // random
                                <span onClick={ () => { onRandomClickLocal(index) } }>
                                    { descriptionFunction.get_random(description, index) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.SELECT) && // select
                                <span onClick={ () => { onSelectClickLocal(index) } }>
                                    { descriptionFunction.get_select(description, index) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.TEXT) && // text
                                <span>
                                    { descriptionFunction.get_text(value) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.TYPE) && // type
                                <span>
                                    { descriptionFunction.get_type(description, index) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.YEAR_MONTH_DAY) && // year month day
                                <span>
                                    { descriptionFunction.get_year_month_day(transaction) }
                                </span>
                            }


                        </span>
                    )
                })
            }
        </p>
    )
}

export default Descriptions;