'use strict';

function repo_init(){
    core_repo_init({
      'title': 'Clock.htm',
    });

    second();

    // Setup hands.
    var hands = [
      'hours-hand',
      'minutes-hand',
      'seconds-hand',
    ];
    for(var hand in hands){
        var hand_element = document.getElementById(hands[hand]);
        hand_element.style.background = '#' + core_random_hex();
        hand_element.style.height = '10px';
        hand_element.style.left = '50%';
        hand_element.style.position = 'fixed';
        hand_element.style.top = '50%';
        hand_element.style.transformOrigin = 'left';
        hand_element.style.width = (hand * 100 + 100) + 'px';
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
