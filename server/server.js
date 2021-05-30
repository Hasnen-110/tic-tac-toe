import Express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import cors from 'cors';
import { checkWinner } from './controller/board';
import { getNextMove } from './controller/computer';

const app = Express();

app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req, res) => res.status(200).send("Hi, letsEndorse! :-)"));

app.post('/checkwinner', checkWinner);
app.post('/nextmove', getNextMove);

app.listen(
    config.application.port, 
    () => console.log('Server started on port: ', config.application.port)
);