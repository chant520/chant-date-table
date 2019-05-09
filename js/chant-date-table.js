$(function(){
    function getCustomeDate(year,month,day){
        return new Date(year,month,day);
    }
    
    function getMonthDay(d){
        return d.getDate();
    }

    //获取年份
    function getCurrentYear(d){
        return d.getFullYear();
    }

    //当前日期
    function getCurrentDate(type){
        let date = new Date();
        switch(type){
            case 'year':
                return date.getFullYear();
            case 'month':
                return date.getMonth() + 1;
            case 'day':
                return date.getDate();
            case 'week':
                return date.getDay();
        }
    }

    //获取星期 
    function getWeekByDay(d){
        return d.getDay();
    }
    //获取月份
    function getCurrentMonth(d = null){
        if(!d){
            let d = new Date();
        }
        return d.getMonth() + 1;
    }

    //获取月份天数
    function getMonthLength(year,month){
        return (new Date(year,month+1,0)).getDate()
    }

    getMontDayWithWeek()

    function getMontDayWithWeek(year = null, month = null){
        if(!year || !month){
            let date   = new Date();
            year   = getCurrentYear(date);
            month  = getCurrentMonth(date);
        }
        let fristDate   = new Date(year,month-1,1);
        // 第一天是星期几
        let fristDayWeek= getWeekByDay(fristDate);
        // 月份天数
        let monthLength = getMonthLength(year,month-1);

        let start = 1,dateArr = [];
        dateArr.push((new Array(fristDayWeek)).fill(0,0,fristDayWeek));
        for(start;start<=monthLength;++start){
            let level = Math.floor((start+fristDayWeek)/7);
            let mod   = (start+fristDayWeek)%7;
            if(!Array.isArray(dateArr[level])){
                dateArr[level] = []
            }
            if(mod === 0){
                --level 
            }
            dateArr[level].push(start);
        }
        let i=0,
        htmlTable ='<tr> <td>日</td> <td>一</td> <td>二</td> <td>三</td> <td>四</td> <td>五</td> <td>六</td> </tr>',
        currentY  = getCurrentDate('year'),
        currentM  = getCurrentDate('month'),
        currentD  = getCurrentDate('day');
        while(dateArr.length){
            columnDate = dateArr.shift();
            let columnDateLength = columnDate.length;
            let m = 0,htmlTd = '';
            htmlTable += "<tr>";
            for(m;m < columnDateLength;++m){
                let dateDay = columnDate[m];
                if(dateDay === 0){
                    htmlTable +="<td></td>"
                }else{
                    if(currentD === dateDay && 
                       currentM === month &&
                       currentY === year
                     ){
                        htmlTable +="<td id='chant-date-active'>"+dateDay+"</td>"
                     }else{
                        htmlTable +="<td>"+dateDay+"</td>"
                     }
                }
            }
            htmlTable += "</tr>"
            ++i
        }
        $('#chant-data-table table').append(htmlTable)
        
    }
})
