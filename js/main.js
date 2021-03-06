'use strict';

function repo_init(){
    core_repo_init({
      'title': 'Clock.htm',
    });

    second();

    // Setup hands.
    const hands = [
      'hours-hand',
      'minutes-hand',
      'seconds-hand',
    ];
    for(const hand in hands){
        const hand_element = document.getElementById(hands[hand]);
        hand_element.style.background = '#' + core_random_hex();
        hand_element.style.height = '10px';
        hand_element.style.left = '50%';
        hand_element.style.position = 'fixed';
        hand_element.style.top = '50%';
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
