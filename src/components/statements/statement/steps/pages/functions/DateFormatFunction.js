

class DateFormatFunction{

    static start_period(date){
        let end_period = new Date(date);
        let start_period = new Date(end_period.getFullYear(), end_period.getMonth(), 1);
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        let result = months[start_period.getMonth()] + ' ' + start_period.getDate() + ', ' + start_period.getFullYear();

        return result;
    }

    static end_period(date){
        let end_period = new Date(date);
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        let result = months[end_period.getMonth()] + ' ' + end_period.getDate() + ', ' + end_period.getFullYear();

        return result;
    }
}

export default DateFormatFunction;