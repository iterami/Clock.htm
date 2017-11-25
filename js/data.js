'use strict';

function rotate_hand(id, percent){
    document.getElementById(id).style.transform =
      'rotate(' + (360 * percent - 90) + 'deg)';
}

function second(){
    var date = core_timestamp_to_date();

    document.getElementById('time').innerHTML = core_format_date({
      'date': date,
    });

    if(date['hour'] > 11){
        date['hour'] -= 12;
    }
    date['hour'] = date['hour'] / 12;
    date['minute'] = date['minute'] / 60;
    date['second'] = date['second'] / 60;

    rotate_hand(
      'hours-hand',
      date['hour'] + date['minute'] / 12
    );
    rotate_hand(
      'minutes-hand',
      date['minute'] + date['second'] / 60
    );
    rotate_hand(
      'seconds-hand',
      date['second']
    );
}
