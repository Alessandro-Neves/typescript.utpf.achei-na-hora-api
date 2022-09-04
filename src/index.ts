import express, { Express, Request, Response } from 'express'
import cors from 'cors'

const app: Express = express();

app.use(cors({
  origin: ['http: //localhost:3000']
}));

app.get('/', (req: Request, res: Response) => res.send('Ping success!'))

app.use((req, res) => res.send("Esta rota não existe!").status(404))

app.listen(3030, () => {
  console.log("Servidor rodando na porta 3030 !")
})

// One Year Later