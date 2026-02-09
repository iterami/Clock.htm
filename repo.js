'use strict';

function randomize(){
    const hands = [
      'hours-hand',
      'minutes-hand',
      'seconds-hand',
    ];
    for(const hand in hands){
        core_elements[hands[hand]].style.backgroundColor = '#' + core_random_hex();
    }
    core_elements.face.style.backgroundColor = '#' + core_random_hex();
}

function repo_init(){
    core_repo_init({
      'events': {
        'randomize': {
          'onclick': randomize,
        },
      },
      'info': '<button id=randomize type=button>Randomize Colors</button>',
      'title': 'Clock.htm',
      'ui_elements': [
        'face',
        'hours-hand',
        'minutes-hand',
        'seconds-hand',
        'time',
      ],
    });

    second();
    resize();
    randomize();
    globalThis.onresize = resize;

    core_interval_modify({
      'id': 'clock',
      'interval': -2,
      'todo': second,
    });
}

function resize(){
    const hands = [
      'hours-hand',
      'minutes-hand',
      'seconds-hand',
    ];
    const radius = Math.min(
      globalThis.innerWidth / 2,
      globalThis.innerHeight / 2 - 55
    );
    for(const hand in hands){
        const style = core_elements[hands[hand]].style;
        style.border = '1px solid #000';
        style.height = '10px';
        style.left = '50%';
        style.position = 'fixed';
        style.top = (radius + 100) + 'px';
        style.transformOrigin = 'left';
        style.width = (hand * (radius / 3) + (radius / 3)) + 'px';
    }

    const style = core_elements.face.style;
    style.borderRadius = radius + 'px';
    style.height = (radius * 2) + 'px';
    style.left = '50%';
    style.marginLeft = -radius + 'px';
    style.position = 'fixed';
    style.top = '105px';
    style.width = style.height;
}

function rotate_hand(id, percent){
    core_elements[id].style.transform =
      'rotate(' + (360 * percent - 90) + 'deg)';
}

function second(){
    const date = timestamp_to_date();

    const formatted = time_format({
      'date': date,
    });
    document.title = formatted;
    core_elements.time.textContent = formatted;

    if(date.hour > 11){
        date.hour -= 12;
    }
    date.hour = date.hour / 12;
    date.minute = date.minute / 60;
    date.second = date.second / 60;

    rotate_hand(
      'hours-hand',
      date.hour + date.minute / 12
    );
    rotate_hand(
      'minutes-hand',
      date.minute + date.second / 60
    );
    rotate_hand(
      'seconds-hand',
      date.second
    );
}
