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
                    if (Holidays[key]['date']==cur_date){h_ex=true; return false;}
                }
                if (!h_ex){break;}
            }
        }
        date.setHours(hour);
        return date;
    }

    beautifulDate(date){
        let result = '';
        if (date instanceof Date && !isNaN(date)){
        result = 
                ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + '/' + 
                (date.getDate()<10?'0'+date.getDate():date.getDate()) + '/' +
                date.getFullYear().toString().substr(2, 2) + ' ' + 
                (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':' +
                (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
        }else{
            console.log(date);
        }
        return result;
    }

}

export default DateFunction;