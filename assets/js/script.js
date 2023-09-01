let char = new Knight('Knight');
let monster = new BigMonster();
let log = new Log(document.querySelector('.log'));

function rolarParaUltimaLinha(El) {
    El.scrollTop = El.scrollHeight;
}

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();