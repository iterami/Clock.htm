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
        const element = document.getElementById(hands[hand]);
        element.style.backgroundColor = '#' + core_random_hex();
        element.style.border = '1px solid #000';
        element.style.height = '10px';
        element.style.left = '50%';
        element.style.position = 'fixed';
        element.style.top = '400px';
        element.style.transformOrigin = 'left';
        element.style.width = (hand * 100 + 100) + 'px';
    }

    const face = document.getElementById('face');
    face.style.backgroundColor = '#' + core_random_hex();
    face.style.borderRadius = '300px';
    face.style.height = '600px';
    face.style.left = '50%';
    face.style.marginLeft = '-300px';
    face.style.position = 'fixed';
    face.style.top = '105px';
    face.style.width = '600px';

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
