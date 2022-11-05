class DateFunction{

    constructor(){

    }

    random(period, Holidays, startH = 9, endH = 16){
        var date = new Date();
        var hour = startH + Math.random() * (endH - startH) | 0;

        let start = new Date(period);
        start = new Date(start.getFullYear(), start.getMonth(), 1);
        let end = new Date(period);
        
        // check day not off
        while (true){
            date = new Date(+start + Math.random() * (end - start));
            // check if not weekend [0=Sun, 6=Sat]
            if (date.getDay()!=0 && date.getDay()!=6){
                // check if not holiday
                var h_ex = false;
                for (let key in Holidays){
                    var cur_date = 
                                    date.getFullYear() + '-' + // Year
                                    ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + "-" + // Month
                                    (date.getDate()<10?'0'+date.getDate():date.getDate()); // Day
                    if (Holidays[key]['date']==cur_date){h_ex=true; break;}
                }
                if (!h_ex){break;}
            }
        }
        date.setHours(hour);
        return date;
    }

    beautifulDate(date){
        let result = '';
        if (date!=''){
            let month = ['jan.', 'feb.', 'mar.', 'apr.', 'may', 'jun.', 'jul.', 'aug.', 'sep.', 'oct.', 'nov.', 'dec.'];
            let tmpDate = new Date(date);
            result = 
                    (tmpDate.getDate()) + ' ' +
                    (month[tmpDate.getMonth()]) + ' ' +
                    tmpDate.getFullYear().toString().substr(2, 2);
        }

        return result;
    }

    beautifulDateTime(datetime){
        let result = '';
        if (datetime instanceof Date && !isNaN(datetime)){
            result = 
                ((datetime.getMonth()+1)<10?'0'+(datetime.getMonth()+1):(datetime.getMonth()+1)) + '/' + 
                (datetime.getDate()<10?'0'+datetime.getDate():datetime.getDate()) + '/' +
                datetime.getFullYear().toString().substr(2, 2) + ' ' + 
                (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours()) + ':' +
                (datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
        }else{
            console.log(datetime);
        }
        return result;
    }

    get_fullyear_month_day(date){
        date = new Date(date);
        let tmpDate = date.getFullYear() + '-' + 
                        ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + '-' + 
                        (date.getDate()<10?'0'+date.getDate():date.getDate());
        return tmpDate;
    }

    get_hour_minute(date){
        date = new Date(date);
        let tmpDate = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':' + 
                        (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
        return tmpDate;
    }

    get_first_day(date){
        date = new Date(date);
        let tmpDate = new Date(date.getFullYear(), date.getMonth(), 1);
        return this.get_fullyear_month_day(tmpDate);
    }

    #padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    
    formatDate(date) {
        return (
            [
            date.getFullYear(),
            this.#padTo2Digits(date.getMonth() + 1),
            this.#padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                this.#padTo2Digits(date.getHours()),
                this.#padTo2Digits(date.getMinutes()),
                this.#padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    readibleDateTime(date){
        let month = ['jan.', 'feb.', 'mar.', 'apr.', 'may', 'jun.', 'jul.', 'aug.', 'sep.', 'oct.', 'nov.', 'dec.'];
        return date.getDate().toString().padStart(2, '0') + ' ' + month[date.getMonth()] + ' ' + date.getFullYear() + ' ' + 
                date.getHours().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0');
    }

}

export default DateFunction;