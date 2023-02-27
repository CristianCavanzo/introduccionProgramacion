import random from './rockPapper.js';

const buttonReload = document.getElementById('reload');
const yourPet = document.getElementById('yourPet');

const enemyPet = document.getElementById('enemyPet');
const buttonPet = document.getElementById('buttonPet');

const resultado: HTMLParagraphElement = document.getElementById(
    'resultado'
) as HTMLParagraphElement;

const attackPlayer = document.getElementById('attackPlayer');
const attackPC = document.getElementById('attackPC');
const containerMokepons = document.getElementById('containerMokepons');

const containerParrafo = document.getElementById('message');

type TypeAtacks = 'FUEGO' | 'TIERRA' | 'AGUA';
interface Attack {
    type: TypeAtacks;
    weak: TypeAtacks[];
    function: (event: Event) => void;
}
let ataqueJugador: TypeAtacks;
let ataqueEnemigo: TypeAtacks;
let yourPetLife = 3;
let pcPetLife = 3;
const mokepones: Mokepon[] = [];
let turno = 0;
const containerAttacks = document.getElementById('containerAttacks');

class Attacks {
    constructor(public attacks: Attack[]) {}
    create(attack: Attack) {
        this.attacks.push(attack);
    }
    getbyName(name: TypeAtacks): Attack {
        return this.attacks.find((attack) => attack.type === name) as Attack;
    }

    public get all(): Attack[] {
        return this.attacks;
    }
}
const attacks = new Attacks([]);
const disabledUsedButton = (event: Event) => {
    const element = event.target as HTMLButtonElement;
    element.disabled = true;
};

const atackFire = (event: Event) => {
    ataqueJugador = 'FUEGO';
    disabledUsedButton(event);
    ataqueAleatorioEnemigo();
    createMessage();
};
const atackEarth = (event: Event) => {
    ataqueJugador = 'TIERRA';
    disabledUsedButton(event);
    ataqueAleatorioEnemigo();
    createMessage();
};
const atackWater = (event: Event) => {
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
    constructor(
        public name: string,
        public foto: string,
        public vida: number,
        public attacks: Attack[]
    ) {}
}

const hipodoge = new Mokepon(
    'hipodoge',
    '../assets/mokepons_mokepon_hipodoge_attack.png',
    3,
    [
        attacks.getbyName('AGUA'),
        attacks.getbyName('AGUA'),
        attacks.getbyName('AGUA'),
        attacks.getbyName('FUEGO'),
        attacks.getbyName('TIERRA'),
    ]
);
const capipepo = new Mokepon(
    'capipepo',
    '../assets/mokepons_mokepon_capipepo_attack.png',
    3,
    [
        attacks.getbyName('TIERRA'),
        attacks.getbyName('TIERRA'),
        attacks.getbyName('TIERRA'),
        attacks.getbyName('FUEGO'),
        attacks.getbyName('AGUA'),
    ]
);
const ratigueya = new Mokepon(
    'ratigueya',
    '../assets/mokepons_mokepon_ratigueya_attack.png',
    3,
    [
        attacks.getbyName('FUEGO'),
        attacks.getbyName('FUEGO'),
        attacks.getbyName('FUEGO'),
        attacks.getbyName('AGUA'),
        attacks.getbyName('TIERRA'),
    ]
);
mokepones.push(hipodoge, capipepo, ratigueya);

const selectEnemyPet = (mokepons: NodeListOf<HTMLInputElement> | null) => {
    let randomPet = random(
        0,
        (mokepons as NodeListOf<HTMLInputElement>).length - 1
    );

    if (!mokepons) {
        return 'error';
    }

    const selection = Array.from(mokepons)[randomPet];
    if (enemyPet) {
        enemyPet.innerHTML = selection.value;
        document.getElementById('selectPet')?.classList.add('none');
        document.getElementById('selection-attack')?.classList.remove('none');
    }
};
const createAttacks = () => {
    if (containerAttacks) {
        const mokeponSelected = mokepones.find(
            (mokepon) => mokepon.name === yourPet?.innerHTML
        );
        if (mokeponSelected) {
            mokeponSelected.attacks.forEach((type) => {
                const button = document.createElement('button');
                button.innerHTML = type.type;
                button.value = type.type;
                button.addEventListener('click', (event: Event) =>
                    type.function(event)
                );
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

const changeLife = (container: 'yourPetLife' | 'pcPetLife') => {
    const containerLife = document.getElementById(container);
    if (container === 'yourPetLife' && containerLife) {
        --yourPetLife;
        containerLife.innerHTML = String(yourPetLife);
    } else if (containerLife) {
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
    } else if (ataqueJugador === ataqueEnemigo) {
        return 'empate';
    } else {
        changeLife('yourPetLife');
        return 'perdiste';
    }
};

const disableButtons = () => {
    if (containerAttacks) {
        Array.from(containerAttacks.childNodes).map(
            (attack) => ((attack as HTMLButtonElement).disabled = true)
        );
    }
    console.log('entra');
    buttonReload?.classList.remove('none');
};

const resultCombat = () => {
    const parrafo = document.createElement('p');
    if (pcPetLife === 0) {
        parrafo.innerHTML = `GANASTE`;
        disableButtons();
    } else if (yourPetLife === 0) {
        parrafo.innerHTML = `PERDISTE :c`;
        disableButtons();
    } else if (turno === 5) {
        disableButtons();
    }
    containerParrafo?.appendChild(parrafo);
};

const createMessage = () => {
    const parrafoPlayer = document.createElement('p');
    const parrafoPC = document.createElement('p');

    parrafoPlayer.innerHTML = ataqueJugador;
    parrafoPC.innerHTML = ataqueEnemigo;
    if ((pcPetLife !== 0 && yourPetLife !== 0) || turno !== 4) {
        resultado.innerHTML = result();
        attackPlayer?.appendChild(parrafoPlayer);
        attackPC?.appendChild(parrafoPC);
    }
    resultCombat();
};

const reload = () => {
    window.location.reload();
};

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
        containerMokepons?.appendChild(label);
    });
    const mokepons: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('[name="mokepon"]');
    const selectPetPlayer = () => {
        const mokepon: HTMLInputElement | null = document.querySelector(
            '[name="mokepon"]:checked'
        );
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
    buttonReload?.addEventListener('click', () => window.location.reload());
}
