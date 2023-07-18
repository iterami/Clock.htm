'use strict';

function repo_init(){
    core_repo_init({
      'title': 'Clock.htm',
    });

    second();

    const hands = [
      'hours-hand',
      'minutes-hand',
      'seconds-hand',
    ];
    for(const hand in hands){
        const hand_element = document.getElementById(hands[hand]);
        hand_element.style.backgroundColor = '#' + core_random_hex();
        hand_element.style.height = '10px';
        hand_element.style.left = Math.min(
          350,
          Math.floor(window.innerWidth / 2)
        ) + 'px';
        hand_element.style.position = 'fixed';
        hand_element.style.top = '350px';
        hand_element.style.transformOrigin = 'left';
        hand_element.style.width = (hand * 100 + 100) + 'px';
    }

    core_interval_modify({
      'id': 'clock',
      'interval': 1000,
      'sync': true,
      'todo': second,
    });
}

function rotate_hand(id, percent){
    document.getElementById(id).style.transform =
      'rotate(' + (360 * percent - 90) + 'deg)';
}

function second(){
    const date = timestamp_to_date();

    document.getElementById('time').textContent = time_format({
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
