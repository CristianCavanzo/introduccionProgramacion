import express, { Response, Request } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const app = express();
app.use(express.json());

const jugadores: Jugador[] = [];

class Jugador {
    public mokepon: string = '';
    public x: number = 0;
    public y: number = 0;
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
    actualizarPosicion(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Mokepon {
    constructor(public name: string) {}
}

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

app.listen(3000, () => {
    console.log(`Ejecutando http://localhost:3000/`);
});
