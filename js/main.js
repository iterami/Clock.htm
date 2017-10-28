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

    core_interval_modify({
      'interval': 1000,
      'todo': second,
    });
}
