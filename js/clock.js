'use strict';

function rotate_hand(id, percent){
    document.getElementById(id).style.transform =
      'translatex(-50%) '
      + 'rotate(' + (360 * percent - 90) + 'deg)';
}

function second(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var date_display =
      date.getFullYear()
      + '-'
      + two_digits(date.getMonth() + 1)
      + '-'
      + two_digits(date.getDate())
      + ' '
      + two_digits(hours)
      + ':'
      + two_digits(minutes)
      + ':'
      + two_digits(seconds)
      + ' ('
      + (date.getTimezoneOffset() / -60)
      + ')';
    document.getElementById('time').innerHTML = date_display;

    if(hours > 11){
        hours -= 12;
    }
    hours = hours / 12;
    minutes = minutes / 60;
    seconds = seconds / 60;

    rotate_hand(
      'hours-hand',
      hours + minutes / 12
    );
    rotate_hand(
      'minutes-hand',
      minutes + seconds / 60
    );
    rotate_hand(
      'seconds-hand',
      seconds
    );
}

function two_digits(value){
    return value.toString().length < 2
      ? '0' + value
      : value;
}

window.onload = function(){
    second();

    window.setInterval(
      second,
      1000
    );
};
