class Fighter {

    constructor(name, damage, hp, strength, agility) {
        this.name = name;
        this.damage = damage;
        this.hp = hp;
        this.maxHp = hp;
        this.strength = strength;
        this.agility = agility;
        this.wins = 0;
        this.losses = 0;
        this.miss = 100
    }

    getName() {
        return this.name;
    }

    getDamage() {
        return this.damage;
    }

    getStrength() {
        return this.strength;
    }
    
    getAgility() {
        return this.agility;
    }

    getHealth() {
        return this.hp;
    }

    logCombatHistory() {
        return `Name: ${this.name}, Wins: ${this.wins}, Losses: ${this.losses}`;
    }

    addWin() {
        this.wins++;
    }

    addLoss() {
        this.losses++;
    }

    heal(amountHeal) {
        this.hp += amountHeal;
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
    }

    dealDamagefighter(fighter) {
        this.hp -= fighter.getDamage();
        if (this.hp < 0) {
            this.hp = 0;
        }
        console.log(
            `${fighter.getName()} makes ${fighter.getDamage()} damage to ${this.name}`
        );
    }

    attack(fighter) {
        if (Math.random() * fighter.miss > this.agility + this.strength) {
            this.dealDamagefighter(fighter);
        } else {
            console.log(`${fighter.getName()} attack missed`);
        }
    }
    
}

const FIGHTER1 = new Fighter('Commodus', 20, 100, 20, 30);
const FIGHTER2 = new Fighter('Maximus', 20, 100, 30, 20);

battle(FIGHTER1, FIGHTER2);

function battleResult(status) {
    if (status) {
        FIGHTER1.addLoss();
        FIGHTER2.addWin();
        console.log(`${FIGHTER2.getName()} has won!`);
    } else {
        FIGHTER2.addLoss();
        FIGHTER1.addWin();
        console.log(`${FIGHTER1.getName()} has won!`);
    }
}

function battle(fighter1, fighter2) {
    if (fighter1.getHealth() !== 0 & fighter2.getHealth() !== 0) {
        while (fighter1.getHealth() !== 0 & fighter2.getHealth() !== 0) {
            fighter1.attack(fighter2);
            console.log(fighter1.getHealth());
            if (fighter1.getHealth() === 0) {
                this.battleResult(true);
                break;
            }
            fighter2.attack(fighter1);
            console.log(fighter2.getHealth());
            if (fighter2.getHealth() === 0) {
                this.battleResult(false);
                break;
            }
        }
    } else if (fighter1.getHealth() === 0) {
        console.log(`${fighter1.getName()} is dead`);
    } else {
        console.log(`${fighter2.getName()} is dead`);
    }
}