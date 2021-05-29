import Express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import cors from 'cors';

const app = Express();

app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req, res) => res.status(200).send("Hi letsEndorse!"));

app.listen(
    config.application.port, 
    () => console.log('Server started on port: ', config.application.port)
);