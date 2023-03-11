import express, { Response, Request } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const app = express();
import path from 'path';
app.use(express.json());

app.set('view engine', 'html');
app.set('views', path.join(__dirname, './src/html'));
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

const jugadores: Jugador[] = [];

class Jugador {
    public mokepon: string = '';
    public x: number = 0;
    public y: number = 0;
    public attacks: string[] = [];
    constructor(public id: string) {}
    static encontrarJugadorById(jugadorId: string) {
        const jugadoresByName = jugadores.find(
            (jugador) => jugador.id === jugadorId
        );
        return jugadoresByName;
    }

    asignMokepon(mokepon: string) {
        this.mokepon = mokepon;
    }
    asignAttacks(attack: string) {
        this.attacks.push(attack);
    }
    actualizarPosicion(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Mokepon {
    constructor(public name: string) {}
}

app.get('/', (req, res) => {
    return res.render('./mokepon');
});

app.get('/unirse', (req, res: Response) => {
    const id = uuidv4();
    const jugador = new Jugador(id);
    jugadores.push(jugador);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(jugador);
});

app.options('/mokepon/:id', cors());
app.post('/mokepon/:id', cors(), (req: Request, res: Response) => {
    const jugadorId = req.params.id;
    const name = req.body.mokepon;
    const mokepon = new Mokepon(name);
    Jugador.encontrarJugadorById(jugadorId)?.asignMokepon(mokepon.name);

    console.log(jugadores);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(jugadores);
});

app.options('/mokepon/:id/posicion', cors());
app.post('/mokepon/:id/posicion', cors(), (req: Request, res: Response) => {
    const jugadorId = req.params.id;
    const x = req.body.x || 0;
    const y = req.body.y || 0;
    const jugadorSeleccionado = Jugador.encontrarJugadorById(jugadorId);
    jugadorSeleccionado?.actualizarPosicion(x, y);
    const enemigos = jugadores.filter((jugador) => jugador.id !== jugadorId);
    res.json(enemigos);
});

app.options('/mokepon/:id/ataques', cors());
app.post('/mokepon/:id/ataques', cors(), (req: Request, res: Response) => {
    const jugadorId = req.params.id;
    const ataqueJugador = req.body.ataqueJugador;
    const jugadorSeleccionado = Jugador.encontrarJugadorById(jugadorId);
    if (!jugadorSeleccionado) {
        return res.json('ok');
    }
    jugadorSeleccionado.asignAttacks(ataqueJugador);
    res.json('ok');
});
app.options('/mokepon/:id/ataques/:turno', cors());
app.get(
    '/mokepon/:id/ataques/:turno',
    cors(),
    (req: Request, res: Response) => {
        const jugadorId = req.params.id;
        const turno: number = Number(req.params.turno);
        const jugadorSeleccionado = Jugador.encontrarJugadorById(jugadorId);
        if (!jugadorSeleccionado) {
            return res.json([]);
        }
        res.json(jugadorSeleccionado.attacks[turno]);
    }
);

app.listen(8080, () => {
    console.log(`Ejecutando http://localhost:8080/`);
});
