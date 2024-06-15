import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
));
app.use(router);

const port = 4000;
app.listen(port, () => {
    console.log('Server is listening on', port);
})




