class Unit {
    constructor(player) {
    const { name, health, damage, armor, speed, src } = player;
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.armor = armor;
        this.src = src;
        this.speed = speed;
    }

    demageReduction() {
        const constanta = 0.06;
        const demRed = this.armor * constanta / (1 + this.armor * constanta);
        return demRed;    
    }

    loseHealth() {
        const demRed = this.demageReduction();
        this.health = this.health / (1 - demRed) - this.damage;
        return this.health;
    }
}

const players = [new Unit({
    src: 'https://wow.zamimg.com/uploads/screenshots/small/751856.jpg',
    name: 'Footman',
    health: 200,
    damage: 50,
    armor: 2,
    speed: 3000
}),
new Unit({
    src: 'https://wow.zamimg.com/uploads/screenshots/small/709944.jpg',
    name: 'Grunt',
    health: 250,
    damage: 70,
    armor: 3,
    speed: 2000
}),
new Unit({
    src: 'https://wow.zamimg.com/uploads/screenshots/small/919180.jpg',
    name: 'Knight',
    health: 300,
    damage: 100,
    armor: 5,
    speed: 3000
}),
new Unit({
    src: 'https://wow.zamimg.com/uploads/screenshots/normal/423646-.jpg',
    name: 'Rifleman',
    health: 100,
    damage: 30,
    armor: 2,
    speed: 1000
})];

class Display {

    constructor() {
        this.charactersList;
        this.playersList;
        this.battleField;
    }

    renderPlayersList(players) {
        this.charactersList = document.querySelector('.characters-list');  
        this.charactersList.innerHTML = players.map(({ src, name }, i) => `<ul class="list">
            <li class="item" id=${i}>
                <img src=${src} alt="${name}" class="img">
                <p class="name">${name}</p>
            </li>
            </ul>`).join('');
        this.playersList = document.querySelectorAll('.item');
        this.playersList.forEach(player => player.addEventListener('click', game.onPlayerClick));
        return this.charactersList;
    }

    renderFighters(fighters) {
        this.battleField = document.querySelector('.battle-field');
        this.battleField.innerHTML = fighters.map(({ src, name, health, damage, armor, speed }, i) => `<ul class="list">
            <li class="item" id=${i}>
                <img src=${src} alt="${name}" class="img">
                <p class="name">${name}</p>
                <ul class="charapters">
                <li class="charapter health">Health: ${health}</li>
                <li class="charapter">Damage: ${damage}</li>
                <li class="charapter">Armor: ${armor}</li>
                <li class="charapter">Speed: ${speed}</li>
                </ul>
            </li>
            </ul>`
        ).join('');
    }

    reset() {
        document.location.reload();
    }
}

const display = new Display();

class Game {

    onStartBtnClick(players) {
        const startBtn = document.querySelector('.start');
        startBtn.addEventListener('click', () => {
            alert('Choose your fighter');
            startBtn.classList.add('hidden');
            display.renderPlayersList(players);
        });    
    }
    
    onPlayerClick(event) {
        display.charactersList.innerHTML = '';
        this.fighters = [];
        const fightBtn = document.querySelector('.fight');
        const player1 = event.currentTarget.id;
        let player2;

        do {
            const count = 4;
            player2 = Math.floor(Math.random() * count);
        } while (player1 === player2);
        this.fighters.push(players[player1], players[player2])
        fightBtn.classList.remove('hidden');

        display.renderFighters(this.fighters);
        game.onFightBtnClick(this.fighters);
    }

    onFightBtnClick(fighters) {
    const fightBtn = document.querySelector('.fight');
        fightBtn.addEventListener('click', () => {
            const showHealth = document.querySelectorAll('.health');
            const time = 1000;
            const interval1 = setInterval(() => {
                showHealth[0].textContent = `Health: ${Math.floor(fighters[0].loseHealth())}`;
                if (fighters[0].health <= 0) {
                    showHealth[0].textContent = 'Health: 0';
                    clearInterval(interval1);
                    clearInterval(interval2);
                    const interval = setInterval(() => {
                        alert(`Win ${fighters[1].name}`);
                        display.reset();
                         if (alert) {
                            clearInterval(interval);
                        }
                        return;
                    }, time)
                }
            }, fighters[1].speed);
            const interval2 = setInterval(() => {
                showHealth[1].textContent = `Health: ${Math.floor(fighters[1].loseHealth())}`;
                if (fighters[1].health <= 0) {
                    showHealth[1].textContent = 'Health: 0';
                    clearInterval(interval1);
                    clearInterval(interval2);
                    const interval = setInterval(() => {
                        alert(`Win ${fighters[0].name}`);
                        if (alert) {
                            clearInterval(interval);
                        }
                        display.reset();
                        return;
                    }, time)
                }
            }, fighters[0].speed);
        });
    }
}

const game = new Game();
game.onStartBtnClick(players);