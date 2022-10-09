import express, { Express, Request, Response } from 'express'
import cors from 'cors'

import routes from './controllers/routes';
import { ConsoleHighlight } from './tools/console'

const app: Express = express();

// app.use(cors({origin: ['http: //localhost:3000', 'http: //localhost:3030']}));

app.use(cors())

app.use(express.json())
express.urlencoded({ extended: true })

app.get('/', (req: Request, res: Response) => res.send('Ping success!'))

app.use(routes)

app.use((req, res) => res.status(404).send('This route does not exist!'))

const PORT = process.env.PORT || 3030
app.listen(PORT, () => ConsoleHighlight(`[ Server running on port ${PORT} ]`))