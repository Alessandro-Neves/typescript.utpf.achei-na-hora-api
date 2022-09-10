import express, { Express, Request, Response } from 'express'
import cors from 'cors'

import routes from './controllers/routes';
import { ConsoleHighlight } from './tools/console';

const app: Express = express();

app.use(cors({
  origin: ['http: //localhost:3000']
}));
app.use(express.json())

app.get('/', (req: Request, res: Response) => res.send('Ping success!'))

app.use(routes)

app.use((req, res) => res.status(404).send('Esta rota não existe!'))

const PORT = process.env.PORT || 3030
app.listen(PORT, () => ConsoleHighlight(`[ Servidor rodando na porta ${PORT} ]`))

// One Year Later