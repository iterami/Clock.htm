'use strict';

function repo_init(){
    second();

    // Setup hands.
    var hands = [
      'hours-hand',
      'minutes-hand',
      'seconds-hand',
    ];
    for(var hand in hands){
        document.getElementById(hands[hand]).style.background = '#' + core_random_hex();
        document.getElementById(hands[hand]).style.height = '10px';
        document.getElementById(hands[hand]).style.left = '50%';
        document.getElementById(hands[hand]).style.position = 'fixed';
        document.getElementById(hands[hand]).style.top = '50%';
        document.getElementById(hands[hand]).style.transformOrigin = 'left';
        document.getElementById(hands[hand]).style.width = (hand * 100 + 100) + 'px';
    }

    window.setInterval(
      second,
      1000
    );
}

function rotate_hand(id, percent){
    document.getElementById(id).style.transform =
      'rotate(' + (360 * percent - 90) + 'deg)';
}

function second(){
    var date = time_timestamp_to_date();

    document.getElementById('time').innerHTML = time_format_date({
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
