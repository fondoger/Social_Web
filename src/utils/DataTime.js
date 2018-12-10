
function isYestday(theDate, nowDate){
    var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime(); //今天凌晨 
    var yestday = new Date(today - 24*3600*1000).getTime();
    return theDate.getTime() < today && yestday <= theDate.getTime();
}

function isTheDayBeforeYestday(theDate, nowDate){
    var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime(); //今天凌晨
    var yestday = new Date(today - 24*3600*1000).getTime();
    var theDayBeforeYestday = new Date(today - 48*3600*1000).getTime();
    return theDate.getTime() < yestday && theDayBeforeYestday <= theDate.getTime();
}

export function calcGMTTimeDiff(GMTString, GMTString2) {
  var timespan = Date.parse(GMTString);
  var timespan2 = Date.parse(GMTString2);
  var minutes = Math.round(Math.abs((timespan2 - timespan)/1000/60));
  return minutes;
};

function descHourMin(hour, min) {
  let res = hour + ':' + ('0' +min).slice(-2);
  if (hour < 6)
    return '凌晨 ' + res;
  if (hour < 11)
    return '早上 ' + res;
  if (hour < 13)
    return '中午 ' + res;
  if (hour < 18)
    return '下午 ' + res;
  return '晚上 ' + res;
}

export function getGMTTimeDiff(GMTString, type) {
  var timespan = Date.parse(GMTString);
  var dateTime = new Date(timespan);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var now = new Date();
  var now_new = Date.parse(now.toUTCString());  //typescript转换写法
  var year_new = now.getFullYear();
  var day_new = now.getDate();
  var hour_new = now.getHours();
  var timeSpanStr;
  var minutes = Math.round((now_new - timespan)/1000/60);
  if (minutes < 1)
    return '刚刚';
  if (minutes < 60)
    return minutes + '分钟前';
  var hours = Math.round(minutes / 60);
  var hour_min = descHourMin(hour, minute);
  if (hours < 24 && day==day_new) {
    return hour_min;
  }
  if (isYestday(dateTime, now))
    return '昨天 '+ hour + ':' + ('0' +minute).slice(-2);
  if (isTheDayBeforeYestday(dateTime, now))
    return '前天 '+ hour + ':' + ('0' +minute).slice(-2);
  if (year == year_new)
    return `${month}月${day}日`;
  return `${year}年${month}月${day}日` ;
};