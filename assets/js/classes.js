class Character {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.attack = 8;
        this.defense = 5;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 110;
        this.attack = 11;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();

        this.fighter1El.querySelector('.atkButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.atkButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(0)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(0)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked){
        
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('Chutando cachorro morto.');
            return;
        }

        let attackFactor = (Math.random() * 0.8 + 0.6);
        let defenseFactor = (Math.random() * 2.5);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        let actualAttackAttacked = attacked.attack * attackFactor;
        let actualDefenseAttacking = attacking.defense * defenseFactor;

        let txt = '';
        let sobre = 0;

        if(actualAttack > actualDefense) {
            sobre = attacked.life - (actualAttack - actualDefense);
            attacked.life -= actualAttack - actualDefense;
            
            txt = `${attacking.name} casou ${actualAttack.toFixed(0) - actualDefense.toFixed(0)} de dano a ${attacked.name}.`;
            if(attacked.life <= 0) {
                txt = `${attacking.name} casou ${actualAttack.toFixed(0) - actualDefense.toFixed(0)} de dano a ${attacked.name}. Sobredano de  ${sobre.toFixed(0)}.`
            }
                        
            this.log.addMessage(txt);
        } else {
            this.log.addMessage(`${attacked.name} defendeu.`);
        }   

        this.update();

        sobre = 0;

        if(attacked.life <= 0) {
            this.log.addMessage(`${attacked.name} morreu.`);
            return;
        }

        if(actualAttackAttacked >  actualDefenseAttacking){
            sobre = attacking.life - (actualAttackAttacked - actualDefenseAttacking);
            attacking.life -= actualAttackAttacked - actualDefenseAttacking;

            txt = `${attacked.name} casou ${actualAttackAttacked.toFixed(0) - actualDefenseAttacking.toFixed(0)} de dano a ${attacking.name}.`;
            if(attacking.life <= 0) {
                txt = `${attacked.name} casou ${actualAttack.toFixed(0) - actualDefense.toFixed(0)} de dano a ${attacking.name}. Sobredano de  ${sobre.toFixed(0)}.`
            }

            
            this.log.addMessage(txt);
        } else {
            this.log.addMessage(`${attacking.name} defendeu.`);
        }
        if(attacking.life <= 0) {

            this.log.addMessage(`${attacking.name} morreu.`);
        }
        
        this.update();
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }
    

    render() {
        this.listEl.innerHTML = '';

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>- ${this.list[i]}</li>`;
            rolarParaUltimaLinha(this.listEl);
        }
    }
    

}


    