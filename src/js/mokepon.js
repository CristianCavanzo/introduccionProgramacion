import random from './rockPapper.js';
const buttonReload = document.getElementById('reload');
const yourPet = document.getElementById('yourPet');
const enemyPet = document.getElementById('enemyPet');
const buttonPet = document.getElementById('buttonPet');
const resultado = document.getElementById('resultado');
const attackPlayer = document.getElementById('attackPlayer');
const attackPC = document.getElementById('attackPC');
const containerMokepons = document.getElementById('containerMokepons');
const containerParrafo = document.getElementById('message');
let ataqueJugador;
let ataqueEnemigo;
let yourPetLife = 3;
let pcPetLife = 3;
const mokepones = [];
let turno = 0;
const containerAttacks = document.getElementById('containerAttacks');
const sectionMap = document.getElementById('sectionMap');
const map = document.getElementById('map');
const lienzo = map === null || map === void 0 ? void 0 : map.getContext('2d');
const moveUpButton = document.getElementById('moveUp');
const moveLeftButton = document.getElementById('moveLeft');
const moveDownButton = document.getElementById('moveDown');
const moveRigthButton = document.getElementById('moveRigth');
class Attacks {
    constructor(attacks) {
        this.attacks = attacks;
    }
    create(attack) {
        this.attacks.push(attack);
    }
    getbyName(name) {
        return this.attacks.find((attack) => attack.type === name);
    }
    get all() {
        return this.attacks;
    }
}
const attacks = new Attacks([]);
const disabledUsedButton = (event) => {
    const element = event.target;
    element.disabled = true;
};
const atackFire = (event) => {
    ataqueJugador = 'FUEGO';
    disabledUsedButton(event);
    ataqueAleatorioEnemigo();
    createMessage();
};
const atackEarth = (event) => {
    ataqueJugador = 'TIERRA';
    disabledUsedButton(event);
    ataqueAleatorioEnemigo();
    createMessage();
};
const atackWater = (event) => {
    ataqueJugador = 'AGUA';
    disabledUsedButton(event);
    ataqueAleatorioEnemigo();
    createMessage();
};
attacks.create({
    type: 'AGUA',
    function: (event) => atackWater(event),
    weak: ['TIERRA'],
});
attacks.create({
    type: 'FUEGO',
    function: (event) => atackFire(event),
    weak: ['AGUA'],
});
attacks.create({
    type: 'TIERRA',
    function: (event) => atackEarth(event),
    weak: ['FUEGO'],
});
class Mokepon {
    constructor(name, foto, vida, attacks, x = 20, y = 30, ancho = 80, alto = 80, mapaFoto = new Image(), velocidadX = 0, velocidadY = 0) {
        this.name = name;
        this.foto = foto;
        this.vida = vida;
        this.attacks = attacks;
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.mapaFoto = mapaFoto;
        this.velocidadX = velocidadX;
        this.velocidadY = velocidadY;
        this.mapaFoto.src = this.foto;
    }
}
const hipodoge = new Mokepon('hipodoge', '../assets/mokepons_mokepon_hipodoge_attack.png', 3, [
    attacks.getbyName('AGUA'),
    attacks.getbyName('AGUA'),
    attacks.getbyName('AGUA'),
    attacks.getbyName('FUEGO'),
    attacks.getbyName('TIERRA'),
]);
const capipepo = new Mokepon('capipepo', '../assets/mokepons_mokepon_capipepo_attack.png', 3, [
    attacks.getbyName('TIERRA'),
    attacks.getbyName('TIERRA'),
    attacks.getbyName('TIERRA'),
    attacks.getbyName('FUEGO'),
    attacks.getbyName('AGUA'),
]);
const ratigueya = new Mokepon('ratigueya', '../assets/mokepons_mokepon_ratigueya_attack.png', 3, [
    attacks.getbyName('FUEGO'),
    attacks.getbyName('FUEGO'),
    attacks.getbyName('FUEGO'),
    attacks.getbyName('AGUA'),
    attacks.getbyName('TIERRA'),
]);
mokepones.push(hipodoge, capipepo, ratigueya);
const selectEnemyPet = (mokepons) => {
    var _a;
    let randomPet = random(0, mokepons.length - 1);
    if (!mokepons) {
        return 'error';
    }
    const selection = Array.from(mokepons)[randomPet];
    if (enemyPet) {
        enemyPet.innerHTML = selection.value;
        (_a = document.getElementById('selectPet')) === null || _a === void 0 ? void 0 : _a.classList.add('none');
        // document.getElementById('selection-attack')?.classList.remove('none');
        sectionMap === null || sectionMap === void 0 ? void 0 : sectionMap.classList.remove('none');
    }
};
const createAttacks = () => {
    if (containerAttacks) {
        const mokeponSelected = mokepones.find((mokepon) => mokepon.name === (yourPet === null || yourPet === void 0 ? void 0 : yourPet.innerHTML));
        if (mokeponSelected) {
            mokeponSelected.attacks.forEach((type) => {
                const button = document.createElement('button');
                button.innerHTML = type.type;
                button.value = type.type;
                button.addEventListener('click', (event) => type.function(event));
                containerAttacks.appendChild(button);
            });
        }
    }
};
const ataqueAleatorioEnemigo = () => {
    const randomSelect = random(0, 2);
    const atacks = attacks.all;
    ataqueEnemigo = atacks[randomSelect].type;
};
const changeLife = (container) => {
    const containerLife = document.getElementById(container);
    if (container === 'yourPetLife' && containerLife) {
        --yourPetLife;
        containerLife.innerHTML = String(yourPetLife);
    }
    else if (containerLife) {
        --pcPetLife;
        containerLife.innerHTML = String(pcPetLife);
    }
};
const result = () => {
    const weakUser = attacks.getbyName(ataqueJugador).weak;
    const winPC = weakUser.some((attack) => {
        return attack === ataqueEnemigo;
    });
    ++turno;
    if (!winPC && ataqueJugador !== ataqueEnemigo) {
        changeLife('pcPetLife');
        return 'ganaste';
    }
    else if (ataqueJugador === ataqueEnemigo) {
        return 'empate';
    }
    else {
        changeLife('yourPetLife');
        return 'perdiste';
    }
};
const disableButtons = () => {
    if (containerAttacks) {
        Array.from(containerAttacks.childNodes).map((attack) => (attack.disabled = true));
    }
    buttonReload === null || buttonReload === void 0 ? void 0 : buttonReload.classList.remove('none');
};
const resultCombat = () => {
    const parrafo = document.createElement('p');
    let result = '';
    if (pcPetLife > yourPetLife) {
        result = 'Perdiste';
    }
    else if (pcPetLife < yourPetLife) {
        result = 'Ganaste';
    }
    else {
        result = 'Empate';
    }
    const text = `Ganaste ${3 - pcPetLife} veces y perdiste ${3 - yourPetLife}. El resultado de la batalla es: ${result}`;
    if (pcPetLife === 0 || yourPetLife === 0 || turno === 5) {
        parrafo.innerHTML = text;
        disableButtons();
    }
    containerParrafo === null || containerParrafo === void 0 ? void 0 : containerParrafo.appendChild(parrafo);
};
const createMessage = () => {
    const parrafoPlayer = document.createElement('p');
    const parrafoPC = document.createElement('p');
    parrafoPlayer.innerHTML = ataqueJugador;
    parrafoPC.innerHTML = ataqueEnemigo;
    if ((pcPetLife !== 0 && yourPetLife !== 0) || turno !== 4) {
        resultado.innerHTML = result();
        attackPlayer === null || attackPlayer === void 0 ? void 0 : attackPlayer.appendChild(parrafoPlayer);
        attackPC === null || attackPC === void 0 ? void 0 : attackPC.appendChild(parrafoPC);
    }
    resultCombat();
};
const reload = () => {
    window.location.reload();
};
const pintarPersonaje = () => {
    capipepo.x = capipepo.x + capipepo.velocidadX;
    capipepo.y = capipepo.y + capipepo.velocidadY;
    console.log(capipepo.velocidadX, capipepo.velocidadY);
    lienzo === null || lienzo === void 0 ? void 0 : lienzo.clearRect(0, 0, map.width, map.height);
    lienzo === null || lienzo === void 0 ? void 0 : lienzo.drawImage(capipepo.mapaFoto, capipepo.x, capipepo.y, capipepo.ancho, capipepo.alto);
};
pintarPersonaje();
const detenerMovimiento = () => {
    capipepo.velocidadX = 0;
    capipepo.velocidadY = 0;
};
const moveUp = () => {
    capipepo.velocidadY = -5;
};
const moveLeft = () => {
    capipepo.velocidadX = -5;
};
const moveDown = () => {
    capipepo.velocidadY = 5;
    console.log(capipepo);
};
const moveRigth = () => {
    capipepo.velocidadX = 5;
    console.log(capipepo);
};
if (moveUpButton && moveLeftButton && moveDownButton && moveRigthButton) {
    setInterval(pintarPersonaje, 100);
    moveUpButton.addEventListener('mousedown', moveUp);
    moveLeftButton.addEventListener('mousedown', moveLeft);
    moveDownButton.addEventListener('mousedown', moveDown);
    moveRigthButton.addEventListener('mousedown', moveRigth);
    moveUpButton.addEventListener('mouseup', detenerMovimiento);
    moveLeftButton.addEventListener('mouseup', detenerMovimiento);
    moveDownButton.addEventListener('mouseup', detenerMovimiento);
    moveRigthButton.addEventListener('mouseup', detenerMovimiento);
    document.onkeydown = (e) => {
        const keypress = e.key;
        switch (keypress) {
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRigth();
                break;
        }
    };
    document.onkeyup = (e) => {
        const keypress = e.key;
        switch (keypress) {
            case 'ArrowDown':
                detenerMovimiento();
                break;
            case 'ArrowUp':
                detenerMovimiento();
                break;
            case 'ArrowLeft':
                detenerMovimiento();
                break;
            case 'ArrowRight':
                detenerMovimiento();
                break;
        }
    };
}
if (buttonPet) {
    mokepones.forEach((mokepon) => {
        const name = mokepon.name;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'mokepon';
        input.id = name;
        input.value = name;
        const label = document.createElement('label');
        label.htmlFor = name;
        label.className = name;
        const p = document.createElement('p');
        p.innerHTML = name;
        label.appendChild(input);
        label.appendChild(p);
        containerMokepons === null || containerMokepons === void 0 ? void 0 : containerMokepons.appendChild(label);
    });
    const mokepons = document.querySelectorAll('[name="mokepon"]');
    const selectPetPlayer = () => {
        const mokepon = document.querySelector('[name="mokepon"]:checked');
        if (!mokepon) {
            return console.log('selecciona un mokepon');
        }
        if (yourPet) {
            yourPet.innerHTML = mokepon.value;
            createAttacks();
        }
        selectEnemyPet(mokepons);
    };
    buttonPet.addEventListener('click', selectPetPlayer);
    buttonReload === null || buttonReload === void 0 ? void 0 : buttonReload.addEventListener('click', reload);
}
