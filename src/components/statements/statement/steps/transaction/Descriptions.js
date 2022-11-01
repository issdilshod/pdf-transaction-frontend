import * as DESCRIPTIONRULES_CONSTS from '../../../../../consts/DescriptionRuleConsts';
import * as DESCRIPTIONRULEVALUE_CONSTS from '../../../../../consts/DescriptionRuleValueConsts';
import DescriptionFunction from './functions/DescriptionFunction';

const Descriptions = ({statement, periodIndex, transactionIndex, descriptionIndex, description, transaction, onCustomerClick, onSenderClick, onRandomClick, onSelectClick, onTypeClick}) => {
    const descriptionFunction = new DescriptionFunction();

    const onCustomerClickLocal = (index) => {
        onCustomerClick(transactionIndex, descriptionIndex, index);
    }

    const onSenderClickLocal = (index) => {
        onSenderClick(transactionIndex, descriptionIndex, index);
    }

    const onRandomClickLocal = (index) => {
        onRandomClick(transactionIndex, descriptionIndex, index);
    }

    const onSelectClickLocal = (index) => {
        onSelectClick(transactionIndex, descriptionIndex, index);
    }

    const onTypeClickLocal = (index) => {
        onTypeClick(transactionIndex, descriptionIndex, index);
    }
    
    return (
        <p>
            <>
                <div className={`c-modal c-modal-hide`}>
                    <div className='c-modal-window'>
                        <div className='c-form-head d-flex'>head</div>
                    </div>
                </div>
            </>
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
                                <b onClick={ () => { onRandomClickLocal(index) } }>
                                    { descriptionFunction.get_random(description, index) }
                                </b>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.SELECT) && // select
                                <b 
                                    className={`${descriptionFunction.get_select(description, index)=='SELECT'?'c-text-danger':''}`}
                                    onClick={ () => { onSelectClickLocal(index) } }
                                >
                                    { descriptionFunction.get_select(description, index) }
                                </b>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.TEXT) && // text
                                <span>
                                    { descriptionFunction.get_text(value) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.TYPE) && // type
                                <b 
                                    className={`${descriptionFunction.get_type(description, index)=='TYPE'?'c-text-danger':''}`}
                                    onClick={ () => { onTypeClickLocal(index) } }
                                >
                                    { descriptionFunction.get_type(description, index) }
                                </b>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.YEAR_MONTH_DAY) && // year month day
                                <span>
                                    { descriptionFunction.get_year_month_day(transaction) }
                                </span>
                            }

                            { (value['description_rule']['type']===DESCRIPTIONRULES_CONSTS.VALUE) && // value
                                <>
                                    { value['description_rule']['value']===DESCRIPTIONRULEVALUE_CONSTS.COMPANY &&
                                        <b>
                                            { descriptionFunction.get_value(statement, statement['periods'][periodIndex], transaction, value) }
                                        </b>
                                    }

                                    { value['description_rule']['value']===DESCRIPTIONRULEVALUE_CONSTS.CUSTOMER &&
                                        <b
                                            className={`${descriptionFunction.get_value(statement, statement['periods'][periodIndex], transaction, value)=='CUSTOMER'?'c-text-danger':''}`}
                                            onClick={ () => { onCustomerClickLocal(index) } }
                                        >
                                            { descriptionFunction.get_value(statement, statement['periods'][periodIndex], transaction, value) }
                                        </b>
                                    }

                                    { value['description_rule']['value']===DESCRIPTIONRULEVALUE_CONSTS.SENDERNAME &&
                                        <b
                                            className={`${descriptionFunction.get_value(statement, statement['periods'][periodIndex], transaction, value)=='SENDER NAME'?'c-text-danger':''}`}
                                            onClick={ () => { onSenderClickLocal(index) } }
                                        >
                                            { descriptionFunction.get_value(statement, statement['periods'][periodIndex], transaction, value) }
                                        </b>
                                    }

                                    { value['description_rule']['value']===DESCRIPTIONRULEVALUE_CONSTS.SENDERID &&
                                        <b
                                            className={`${descriptionFunction.get_value(statement, statement['periods'][periodIndex], transaction, value)=='SENDER ID'?'c-text-danger':''}`}
                                        >
                                            { descriptionFunction.get_value(statement, statement['periods'][periodIndex], transaction, value) }
                                        </b>
                                    }

                                    { value['description_rule']['value']===DESCRIPTIONRULEVALUE_CONSTS.ORGANIZATION &&
                                        <b>
                                            { descriptionFunction.get_value(statement, statement['periods'][periodIndex], transaction, value) }
                                        </b>
                                    }
                                    
                                </>
                            }


                        </span>
                    )
                })
            }
        </p>
    )
}

export default Descriptions;