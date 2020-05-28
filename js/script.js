//var days = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa'];
var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

//var monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; 

//Set day and month names for your language.

//----------Defaults------------
var startWithMonday = true;
var returnFunc = 'alert'; 
var holidayDays = [0]; //0 for Sunday, 1 for Monday...
//------------------------------


var today = new Date();
var thisMonth = today.getMonth();
var thisYear = today.getFullYear();
var thisDay = today.getDate();

function showCalendar(startWithMonday, holidayDays, returnFunc) {
	$('#innerCalendar').remove();
	this.startWithMonday = startWithMonday;
	this.returnFunc = returnFunc;
	this.holidayDays = holidayDays;
    var firstDayofMonth = new Date(thisYear, thisMonth, 1);

    if (startWithMonday)
        var firstDayNameofMonth = firstDayofMonth.getDay() - 1;
    else
        var firstDayNameofMonth = firstDayofMonth.getDay();

    if (firstDayNameofMonth == -1) {
        firstDayNameofMonth = 6;
    }
    var lastDayofMonth = new Date(thisYear, thisMonth + 1, 0);
    var daysInMonth = 0;
    var lastInactive = 0;
    
    prepareTable();

    for (var week = 0; week < 6; week++) {
        $('#innerCalendar').append('<tr class="week-' + week + '"> </tr>');
        for (var i = 0; i < 7; i++) {
            if (i < firstDayNameofMonth && week == 0) {
                $('.week-' + week).append('<td class="inactive unclickable">' + new Date(thisYear, thisMonth, 0 - (firstDayNameofMonth - i - 1)).getDate() + '</td>');
            } else if (daysInMonth >= lastDayofMonth.getDate()) {
                lastInactive += 1;
                $('.week-' + week).append('<td class="inactive unclickable">' + (lastInactive) + '</td>');
            } else {   
            	daysInMonth += 1;
	            if(holidayDays.length > 0){
	            	var currentDay = new Date(thisYear, thisMonth, daysInMonth).getDay();
	        		if( currentDay== holidayDays[0] || currentDay == holidayDays[1] ||
	        			currentDay == holidayDays[2] || currentDay == holidayDays[3] ||
	        			currentDay == holidayDays[4] || currentDay == holidayDays[5] ||
	        			currentDay == holidayDays[6] ){
		            	$('.week-' + week).append('<td class="inactive unclickable">' + daysInMonth + '</td>');
	        		}else{
		            	$('.week-' + week).append('<td onclick="' + returnFunc + '(\'' + new Date(thisYear, thisMonth, daysInMonth) + '\');">' + daysInMonth + '</td>');
	        		}
	        		
            	}else{
	            	$('.week-' + week).append('<td onclick="' + returnFunc + '(\'' + new Date(thisYear, thisMonth, daysInMonth) + '\');">' + daysInMonth + '</td>');
            	}

                
            }



        }
    }
    $('#innerCalendar').append('<tr><th onclick="monthDec()"><</td><td colspan="5" class="unclickable"></th><th onclick="monthInc()">></th>');
}

function prepareTable(){
	$('#calendar').append('<table id="innerCalendar"></table>');
    $('#innerCalendar').append('<tr><th class="unclickable" colspan="7">' + monthNames[thisMonth] + ', ' + thisYear + '</th></tr>');
    if (startWithMonday) {
        $('#innerCalendar').append('<tr><th class="unclickable">' + days[0] + '</th><th class="unclickable">' + days[1] + '</th><th class="unclickable">' + days[2] + '</th><th class="unclickable">' + days[3] + '</th><th class="unclickable">' + days[4] + '</th><th class="unclickable">' + days[5] + '</th><th class="unclickable">' + days[6] + '</th></tr>');
    } else {
        $('#innerCalendar').append('<tr><th class="unclickable">' + days[6] + '</th><th class="unclickable">' + days[0] + '</th><th class="unclickable">' + days[1] + '</th><th class="unclickable">' + days[2] + '</th><th class="unclickable">' + days[3] + '</th><th class="unclickable">' + days[4] + '</th><th class="unclickable">' + days[5] + '</th></tr>');
    }
}


function monthInc() {
    thisMonth += 1;
    if (thisMonth % 12 == 0 && thisMonth != 0) {
        thisYear += 1;
        thisMonth = 0;
    }
    showCalendar(startWithMonday, holidayDays, returnFunc);
}

function monthDec() {
    thisMonth -= 1;
    if (thisMonth < 0) {
        thisYear -= 1;
        thisMonth = 11;
    }
    showCalendar(startWithMonday,holidayDays, returnFunc);
}

showCalendar(startWithMonday, holidayDays, returnFunc);
