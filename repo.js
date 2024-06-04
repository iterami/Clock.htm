'use strict';

function repo_init(){
    core_repo_init({
      'title': 'Clock.htm',
      'ui-elements': [
        'hours-hand',
        'minutes-hand',
        'seconds-hand',
        'time',
      ],
    });

    second();

    const hands = [
      'hours-hand',
      'minutes-hand',
      'seconds-hand',
    ];
    for(const hand in hands){
        const style = core_elements[hands[hand]].style;
        style.backgroundColor = '#' + core_random_hex();
        style.border = '1px solid #000';
        style.height = '10px';
        style.left = '50%';
        style.position = 'fixed';
        style.top = '400px';
        style.transformOrigin = 'left';
        style.width = (hand * 100 + 100) + 'px';
    }

    const style = document.getElementById('face').style;
    style.backgroundColor = '#' + core_random_hex();
    style.borderRadius = '300px';
    style.height = '600px';
    style.left = '50%';
    style.marginLeft = '-300px';
    style.position = 'fixed';
    style.top = '105px';
    style.width = '600px';

    core_interval_modify({
      'id': 'clock',
      'interval': 1000,
      'sync': true,
      'todo': second,
    });
}

function rotate_hand(id, percent){
    core_elements[id].style.transform =
      'rotate(' + (360 * percent - 90) + 'deg)';
}

function second(){
    const date = timestamp_to_date();

    core_elements['time'].textContent = time_format({
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
