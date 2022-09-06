import express, { Express, Request, Response } from 'express'
import cors from 'cors'

import routes from './controllers/routes';

const app: Express = express();

app.use(cors({
  origin: ['http: //localhost:3000']
}));
app.use(express.json())

app.get('/', (req: Request, res: Response) => res.send('Ping success!'))

app.use(routes)

app.use((req, res) => res.status(404).send("Esta rota não existe!"))


app.listen(3030, () => console.log("Servidor rodando na porta 3030 !"))

// One Year Later