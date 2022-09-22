import express, { Express, Request, Response } from 'express'
import cors from 'cors'

import routes from './controllers/routes';
import { ConsoleHighlight } from './tools/console'

import multer from 'multer';
import path from 'path'

const app: Express = express();

// app.use(cors({origin: ['http: //localhost:3000', 'http: //localhost:3030']}));

app.use(cors())

app.use(express.json())
express.urlencoded({ extended: true })

app.get('/', (req: Request, res: Response) => res.send('Ping success!'))

app.use(routes)


// const multerMiddleware = multer({ dest: 'files/' })
const multerMiddleware = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {cb(null, 'files/')},
    filename: function (req, file, cb) {cb(null, new Date().valueOf() + '_' + file.originalname)}
  })
})
app.post('/uploadv2', multerMiddleware.single('image'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.status(201).json({msg: 'uploaded!', file: req.file})
})

app.get('/files/:nameAndExtension', (req: Request, res: Response) => {
  const dirname = path.resolve()
  const absoluteFilePath = path.join(dirname, 'files/'+req.params.nameAndExtension)

  console.log('request to '+absoluteFilePath)

  res.sendFile(absoluteFilePath)
})

app.use((req, res) => res.status(404).send('Esta rota não existe!'))

const PORT = process.env.PORT || 3030
app.listen(PORT, () => ConsoleHighlight(`[ Servidor rodando na porta ${PORT} ]`))

// One Year Later