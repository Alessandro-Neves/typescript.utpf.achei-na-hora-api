import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.listen(3030, () => {
  console.log("Servidor rodando na porta 3030 !")
})

app.get('/', (req: Request, res: Response) => {
  res.send('Ping success!')
})

// One Year Later