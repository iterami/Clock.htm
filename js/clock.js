'use strict';

function rotate_hand(id, percent){
    document.getElementById(id).style.transform =
      'translatex(-50%) '
      + 'rotate(' + (360 * percent - 90) + 'deg)';
}

function second(){
    var date = new Date();
    var date_display =
      date.getFullYear()
      + '-'
      + two_digits(date.getMonth() + 1)
      + '-'
      + two_digits(date.getDate())
      + ' '
      + two_digits(date.getHours())
      + ':'
      + two_digits(date.getMinutes())
      + ':'
      + two_digits(date.getSeconds())
      + ' ('
      + (date.getTimezoneOffset() / -60)
      + ')';

    document.getElementById('time').innerHTML = date_display;

    var hours = date.getHours();
    if(hours > 11){
        hours -= 12;
    }

    rotate_hand(
      'hours-hand',
      hours / 12
    );
    rotate_hand(
      'minutes-hand',
      date.getMinutes() / 60
    );
    rotate_hand(
      'seconds-hand',
      date.getSeconds() / 60
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
      'second()',
      1000
    );
};
